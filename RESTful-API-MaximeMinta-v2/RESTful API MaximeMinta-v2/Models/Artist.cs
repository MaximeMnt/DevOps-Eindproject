using RESTful_API_MaximeMinta_v2.Models;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Runtime.Serialization;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace RESTful_API_MaximeMinta_v2
{
    //[DataContract]
    public class Artist
    {
        [Key]
        public int ArtistID { get; set; } //primaire sleutel
        [Required]
        [StringLength(50)]
        public string Name { get; set; }

        [JsonIgnore]
        [Url]
        public ICollection<URL> Socials { get; set; }

        //[DataMember]
        [JsonIgnore]
        public ICollection<TrackArtist> Tracks { get; set; }

    }
    
}
