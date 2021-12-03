using System;

namespace ProyectoFinal.Api.Dtos
{
    public class UpdateNegocioDto
    {
        public string Nombre { get; set; }
        public string TipoNegocio { get; set; }
        public string Foto { get; set; }
        public string Telefono { get; set; }
        public string Direccion { get; set; }
        public double Latitud { get; set; }
        public double Longitud { get; set; }
    }
}
