using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AutoMapper;
using ProyectoFinal.Api.Services;
using System.Threading.Tasks;
using ProyectoFinal.Api.Response;
using ProyectoFinal.Api.Entities;
using System.Collections.Generic;
using System;
using ProyectoFinal.Api.Dtos;
using System.Linq;
using NetTopologySuite;
using NetTopologySuite.Geometries;
using System.IO;

namespace ProyectoFinal.Api.Controllers
{
    [ApiController]
    [Route("api/[Controller]")]
    public class NegociosController : ControllerBase
    {
        private readonly INegocioServices _negocioServices;
        private readonly IMapper _mapper;

        public NegociosController(INegocioServices negocioServices, IMapper mapper)
        {
            this._negocioServices = negocioServices;
            this._mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<ApiResponse<List<NegocioDto>>>> GetAll([FromQuery] RequestParameter parameter)
        {
            var response = new ApiResponse<List<NegocioDto>>();
            try
            {
                var negocios = await this._negocioServices.GetNegocios(parameter.PageNumber, parameter.PageSize);
                var total = await this._negocioServices.GetTotalRegistros();
                response.TotalRegistros = total;
                response.Data = _mapper.Map<List<NegocioDto>>(negocios);
            }
            catch (Exception ex)
            {
                response.Message = ex.Message;
                response.Succeeded = false;
            }

            return Ok(response);
        }
        [HttpGet("map")]
        public async Task<ActionResult<ApiResponse<List<NegocioDto>>>> GetAll()
        {
            var response = new ApiResponse<List<NegocioDto>>();
            try
            {
                var negocios = await this._negocioServices.GetNegocios();
                response.Data = _mapper.Map<List<NegocioDto>>(negocios);
            }
            catch (Exception ex)
            {
                response.Message = ex.Message;
                response.Succeeded = false;
            }

            return Ok(response);
        }
        [HttpGet("{id:Guid}")]
        public async Task<ActionResult<ApiResponse<NegocioDto>>> GetById(Guid id)
        {
            var response = new ApiResponse<NegocioDto>();
            try
            {
                var negocio = await this._negocioServices.GetNegocio(id);
                if(negocio is not null)
                {
                    response.Data = _mapper.Map<NegocioDto>(negocio);
                }
                else{
                    response.Message = "Negocio no encontrado";
                }
               
            }
            catch (Exception ex)
            {
                response.Succeeded = false;
            }

            return response.Succeeded ? Ok(response) : NotFound(response);
        }

        [HttpPost]
        public async Task<ActionResult<ApiResponse<int>>> Post([FromBody] AddNegocioDto negocioDto)
        {
            var response = new ApiResponse<int>();
            try
            {  
                var negocio = _mapper.Map<Negocio>(negocioDto);
                negocio.FechaCreacion = DateTime.Now;
                negocio.FechaActualizacion = DateTime.Now;
                var result = await this._negocioServices.CreateNegocio(negocio);
                response.Data = result;
            }
            catch (Exception ex)
            {
                response.Message = ex.Message;
                response.Succeeded = false;
                return BadRequest(response);
            }

            return Created("", response);
        }

        [HttpPut("{id:Guid}")]
        public async Task<ActionResult<ApiResponse<int>>> Put(Guid id, [FromBody] UpdateNegocioDto negocioDto)
        {
            var response = new ApiResponse<int>();
            try
            {
                var negocio = await this._negocioServices.GetNegocio(id);
                if(negocio is not null)
                {
                    var geometryFactory = NtsGeometryServices.Instance.CreateGeometryFactory(srid: 4326);
                    negocio.Nombre = negocioDto.Nombre;
                    negocio.TipoNegocio = negocioDto.TipoNegocio;
                    negocio.Foto = negocioDto.Foto;
                    negocio.Telefono = negocioDto.Telefono;
                    negocio.Direccion = negocioDto.Direccion;
                    negocio.Ubicacion = geometryFactory.CreatePoint(new Coordinate(negocioDto.Longitud, negocioDto.Latitud));
                    var result = await this._negocioServices.UpdateNegocio(negocio);
                    response.Data = result;
                }
                else
                {
                    response.Succeeded = false;
                    response.Message = "Negocio no encontrado";
                    return NotFound(response);
                }
               
            }
            catch (Exception ex)
            {
                response.Succeeded = false;
                return BadRequest(response);
            }

            return Ok(response);
        }

        [HttpDelete("{id:Guid}")]
        public async Task<ActionResult<ApiResponse<int>>> Delete(Guid id)
        {
            var response = new ApiResponse<int>();
            try
            {
                bool isExist = await this._negocioServices.IsExist(id);
                if (isExist)
                {
                    var result = await this._negocioServices.DeleteNegocio(id);
                    response.Data = result;
                }
                else
                {
                    response.Succeeded = false;
                    response.Message = "Negocio no encontrado";
                    return NotFound(response);
                }

            }
            catch (Exception ex)
            {
                response.Message = ex.Message;
                response.Succeeded = false;
                return BadRequest(response);
            }

            return Ok(response);
        }

    }
}
