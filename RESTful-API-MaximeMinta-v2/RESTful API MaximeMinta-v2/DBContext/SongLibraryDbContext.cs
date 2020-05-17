using Microsoft.EntityFrameworkCore;
using RESTful_API_MaximeMinta_v2.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RESTful_API_MaximeMinta_v2
{
    public class SongLibraryDbContext : DbContext
    {
        public DbSet<Track> Tracks { get; set; }
        public DbSet<Artist> Artists { get; set; }
        public DbSet<TrackArtist> TrackArtists { get; set; }
        public DbSet<URL> URLs { get; set; }

        public SongLibraryDbContext(DbContextOptions<SongLibraryDbContext> options): base(options) 
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<TrackArtist>()
                .HasKey(t => new { t.ArtistID, t.TrackID });

            modelBuilder.Entity<TrackArtist>()
                .HasOne(t => t.Artist)
                .WithMany(a => a.Tracks)
                .HasForeignKey(t => t.ArtistID);

            modelBuilder.Entity<TrackArtist>()
                .HasOne(t => t.Track)
                .WithMany(a => a.Artists)
                .HasForeignKey(t => t.TrackID);
        }



    }
}
