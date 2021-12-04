using ProyectoFinal.Api.Data;
using ProyectoFinal.Api.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace ProyectoFinal.Api.Services
{
    public class NegocioServices : INegocioServices
    {
        private readonly ApplicationDbContext _context;

        public NegocioServices(ApplicationDbContext context)
        {
            this._context = context;
        }
        public async Task<List<Negocio>> GetNegocios(int pageNumber, int pageSize)
        {
            var negocios = await this._context.Negocios
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();
            return negocios;
        }

        public async Task<List<Negocio>> GetNegocios()
        {
            var negocios = await this._context.Negocios
                .ToListAsync();
            return negocios;
        }
        public async Task<Negocio> GetNegocio(Guid id)
        {
            var negocio = await this._context.Negocios.
                FirstOrDefaultAsync(n => n.Id == id);
            return negocio;
        }

        public async Task<int> CreateNegocio(Negocio negocio)
        {
            this._context.Add(negocio);
            return await this._context.SaveChangesAsync();
        }
        public async Task<int> UpdateNegocio(Negocio negocio)
        {
            _context.Entry(negocio).State = EntityState.Modified;
            return await this._context.SaveChangesAsync();
        }

        public async Task<int> DeleteNegocio(Guid id)
        {
            var negocio = await this.GetNegocio(id);
            _context.Entry(negocio).State = EntityState.Deleted;
            return await this._context.SaveChangesAsync();
        }

        public async Task<bool> IsExist(Guid id)
        {
            var negocio = await this.GetNegocio(id);
            return negocio is not null;
        }

        public async Task<int> GetTotalRegistros()
        {
            return await this._context.Negocios.CountAsync();
        }
    }
}
