using ProyectoFinal.Api.Entities;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ProyectoFinal.Api.Services
{
    public interface INegocioServices
    {
        public Task<List<Negocio>> GetNegocios(int PageNumber, int PageSize);
        public Task<List<Negocio>> GetNegocios();
        public Task<Negocio> GetNegocio(Guid id);
        public Task<bool> IsExist(Guid id);
        public Task<int> CreateNegocio(Negocio negocio);
        public Task<int> UpdateNegocio(Negocio negocio);
        public Task<int> DeleteNegocio(Guid id);
        public Task<int> GetTotalRegistros();
    }
}
