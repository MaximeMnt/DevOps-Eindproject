using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using RESTful_API_MaximeMinta_v2.Models;

namespace RESTful_API_MaximeMinta_v2
{
    [Microsoft.AspNetCore.Authorization.Authorize]
    [Route("api/[controller]")]
    public class URLsController : Controller
    {
        private readonly SongLibraryDbContext library;

        public URLsController(SongLibraryDbContext library)
        {
            this.library = library;
        }

        [HttpGet]
        public string Get()
        {
            return "het werkt!";
        }


        // POST: api/URLs
        [HttpPost]
        public IActionResult CreateURL([FromBody] URL newURL)
        {
            try
            {
                if (newURL == null)
                {
                    return BadRequest();
                }
                //Track toevoegen
                library.URLs.Add(newURL);
                library.SaveChanges(); //opslaan
                return Created("", newURL); //stuur een result 201 terug met het boek als content
            }
            catch (Exception)
            {
                return BadRequest();
            }           
        }

        // PUT: api/URLs/5
        [HttpPut("{id}")]
        public IActionResult UpdateUrl([FromBody] string updateURL, int id)
        {
            if(updateURL == null)
            {
                return BadRequest();
            }

            var originalURL = library.URLs.Find(id);
            if(originalURL == null)
            {
                return NotFound();
            }
            else
            {
                originalURL.Url = updateURL;
                library.SaveChanges();
                return Ok(originalURL);
            }


        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var url = library.URLs.Find(id);
            if(url == null)
            {
                return NotFound();
            }
            else
            {
                library.URLs.Remove(url);
                library.SaveChanges();
                return NoContent();
            }
        }
    }
}
