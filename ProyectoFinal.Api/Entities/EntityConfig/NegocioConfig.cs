using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace ProyectoFinal.Api.Entities.EntityConfig
{
    public class NegocioConfig : IEntityTypeConfiguration<Negocio>
    {
        public void Configure(EntityTypeBuilder<Negocio> builder)
        {
            builder.HasIndex(e => e.Id);
            builder.Property(p => p.Nombre)
                .HasColumnType("varchar(100)")
                .IsRequired();
            builder.Property(p => p.TipoNegocio)
                .HasColumnType("varchar(100)")
                .IsRequired();
            builder.Property(p => p.Foto)
                .HasColumnType("varchar(max)")
                .IsRequired();
            builder.Property(p => p.Telefono)
                .HasColumnType("varchar(100)")
                .IsRequired();
            builder.Property(p => p.Direccion)
                .HasColumnType("varchar(200)")
                .IsRequired();
            builder.Property(p => p.Ubicacion)
                .IsRequired();
        }
    }
}
