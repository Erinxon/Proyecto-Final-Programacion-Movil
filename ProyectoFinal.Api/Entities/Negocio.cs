using NetTopologySuite.Geometries;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using static System.Net.Mime.MediaTypeNames;

namespace ProyectoFinal.Api.Entities
{
    public class Negocio
    {
        public Guid Id { get; set; }
        public string Nombre { get; set; }
        public string TipoNegocio { get; set; }
        public string Foto { get; set; }
        public string Telefono { get; set; }
        public string Direccion { get; set; }
        public DateTime FechaCreacion { get; set; }
        public DateTime FechaActualizacion { get; set; }
        public Geometry Ubicacion { get; set; } 
    }
}
