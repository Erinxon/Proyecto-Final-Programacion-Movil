using AutoMapper;
using NetTopologySuite;
using NetTopologySuite.Geometries;
using ProyectoFinal.Api.Dtos;
using ProyectoFinal.Api.Entities;

namespace ProyectoFinal.Api.AutoMapperConfig
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            var geometryFactory = NtsGeometryServices.Instance.CreateGeometryFactory(srid: 4326);

            CreateMap<Negocio, NegocioDto>()
                .ForPath(x => x.Latitud, opt => opt.MapFrom((ubi) => ubi.Ubicacion.Coordinate.Y))
                .ForPath(x => x.Longitud, opt => opt.MapFrom((ubi) => ubi.Ubicacion.Coordinate.X))
                .ReverseMap();


            CreateMap<AddNegocioDto, Negocio>()
                .ForMember(x => x.Ubicacion, opt => opt.MapFrom((ubi) => geometryFactory.CreatePoint(new Coordinate(ubi.Longitud, ubi.Latitud))))
                .ReverseMap();

            CreateMap<UpdateNegocioDto, Negocio>()
                .ForMember(x => x.Ubicacion, opt => opt.MapFrom((ubi) => geometryFactory.CreatePoint(new Coordinate(ubi.Longitud, ubi.Latitud))))
                .ReverseMap();
        }
    }
}
