using Microsoft.EntityFrameworkCore;
using ProyectoFinal.Api.Entities;
using ProyectoFinal.Api.Entities.EntityConfig;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace ProyectoFinal.Api.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options): base(options)
        {

        }

        public DbSet<Negocio> Negocios { get; set; }

        public override Task<int> SaveChangesAsync(CancellationToken cancellationToken = new CancellationToken())
        {
            foreach (var entry in ChangeTracker.Entries<Negocio>())
            {
                entry.Entity.Id = entry.State switch
                {
                    EntityState.Added => Guid.NewGuid(),
                    _ => entry.Entity.Id
                };
            }
            return base.SaveChangesAsync(cancellationToken);
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfiguration(new NegocioConfig());
            base.OnModelCreating(modelBuilder);
        }
    }
}
