using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace RESTful_API_MaximeMinta_v2
{
    [Microsoft.AspNetCore.Authorization.Authorize]
    [Route("api/artists")]
    public class ArtistController : Controller
    {
        private readonly SongLibraryDbContext library;

        public ArtistController(SongLibraryDbContext library)
        {
            this.library = library;
        }

        [HttpGet] //api/artists
        public List<Artist> GetAllArtists(string name, int? ID, int? page, string sort, int length = 10, string dir = "asc")
        {
            IQueryable<Artist> query = library.Artists;

            if (!string.IsNullOrWhiteSpace(sort))
            {
                switch (sort)
                {
                    case "artistID":
                        if (dir == "asc")
                        {
                            query = query.OrderBy(d => d.ArtistID);
                        }
                        else if (dir == "desc")
                        {
                            query = query.OrderByDescending(d => d.ArtistID);
                        }
                        break;


                    case "name":
                        if (dir == "asc")
                        {
                            query = query.OrderBy(d => d.Name);
                        }
                        else if (dir == "desc")
                        {
                            query = query.OrderByDescending(d => d.Name);
                        }
                        break;
                }
            }

            if (!string.IsNullOrWhiteSpace(name))
                query = query.Where(d => d.Name == name);
            if (ID != null)
                query = query.Where(d => d.ArtistID == ID);
            if (page.HasValue)
                query = query.Skip(page.Value * length);
            query = query.Take(length);


   
            return query
                .Include(d => d.Tracks)
                .ThenInclude(d => d.Track) //level omlaag -> Toon de track
                .AsNoTracking() //toont geen artists opnieuw
                .Include(a => a.Socials)
                .ToList();
        }

        [HttpPost]
        public IActionResult CreateArtist([FromBody] Artist newArtist)
        {
            try
            {
                if (newArtist == null)
                {
                    return BadRequest();
                }

                library.Artists.Add(newArtist);
                library.SaveChanges();
                return Created("", newArtist);
            }
            catch (Exception)
            {

                return BadRequest();
            }          
        }

        [Route("id")]
        [HttpGet]
        public IActionResult GetArtist(int id)
        {
            var Artist = library.Artists.Find(id);
            if (Artist == null)
            {
                return NotFound();
            }
            return Ok(Artist);
        }

        [Route("{id}")]
        [HttpDelete]
        public IActionResult DeleteArtist(int id)
        {
            var Artist = library.Artists.Find(id);
            if (Artist == null)
            {
                return NotFound();
            }
            else
            {
                //verwijder Artist
                library.Artists.Remove(Artist);
                library.SaveChanges();

                return NoContent(); // = de standaard response (204) bij een gelukte delete
            }
        }

        [HttpPut]
        public IActionResult UpdateArtist([FromBody] Artist UpdateArtist)
        {
            var OriginalArtist = library.Artists.Find(UpdateArtist.ArtistID);
            if (OriginalArtist == null)
            {
                return NotFound();
            }else if (OriginalArtist.Name == null)
            {
                return BadRequest();
            }
            else
            {
                OriginalArtist.Name = UpdateArtist.Name;
                OriginalArtist.Socials = UpdateArtist.Socials;
                OriginalArtist.Tracks = UpdateArtist.Tracks;
                library.SaveChanges();
                return Ok(OriginalArtist);
            }

        }

    }
}