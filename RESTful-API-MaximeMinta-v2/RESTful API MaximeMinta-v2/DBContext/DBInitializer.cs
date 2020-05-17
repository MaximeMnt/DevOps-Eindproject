using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RESTful_API_MaximeMinta_v2
{
    public class DBInitializer
    {
        public static void Initialize(SongLibraryDbContext context)
        {
            //create if db not exists
            context.Database.EnsureCreated();

            var track1 = new Track() { Title = "God Is", Key = "Db", BPM = 105, Year=2019, Album ="JESUS IS KING", Genre = "Hip/Hop"};
            var track2 = new Track() { Title = "START, FORMAT IT!", Key = "Bbm", BPM = 109, Year = 2018, Album = "Single", Genre = "Trap" };
            var track3 = new Track() { Title = "Closed on Sunday", Key = "Bm", BPM = 98, Year=2019, Album = "JESUS IS KING", Genre = "Hip/Hop" };
            var artist1 = new Artist() { Name = "Kanye West" };
            var artist2 = new Artist() { Name = "K, Le Maestro" };
            //TRACKS
            if (!context.Tracks.Any())
            {
                //var track = new Track()
                //{
                //    Title = "God Is",
                //    BPM = 105,
                //    Year = 2019,
                //    //ArtistName = "Kanye West",
                //    Album = "JESUS IS KING",
                //    Key = "Db",
                //    Genre = "Hip/Hop",
                //    //Artists = { Artist }

                //};

                //var track2 = new Track()
                //{
                //    Title = "START, FORMAT IT!",
                //    //ArtistName = "K, Le Maestro",
                //    BPM = 109,
                //    Year = 2018,
                //    Album = "Single",
                //    Genre = "Trap",
                //    Key= "Bbm",
                //};

                
                //context.Tracks.Add(track);
                //context.Tracks.Add(track2);
                //context.SaveChanges();
            }

            //ARTISTS
            if (!context.Artists.Any())
            {
                //var Artist = new Artist()
                //{
                //    Name = "Kanye West"
                //};
                //var Artist1 = new Artist()
                //{
                //    Name = "K, Le Maestro"
                //};

                //context.Artists.Add(Artist1);
                //context.Artists.Add(Artist);
                //context.SaveChanges();
            }


            //TrackArtists
            if (!context.TrackArtists.Any())
            {
                var TA1 = new TrackArtist()
                {
                    Track = track1,
                    Artist = artist1

                };

                var TA2 = new TrackArtist()
                {
                    Track = track2,
                    Artist = artist2
                };
                var TA3 = new TrackArtist()
                {
                    Track = track3,
                    Artist = artist1
                };
                context.TrackArtists.Add(TA1);
                context.TrackArtists.Add(TA2);
                context.TrackArtists.Add(TA3);
                context.SaveChanges();
            }
        }
    }
}
