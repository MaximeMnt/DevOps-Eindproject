using Microsoft.VisualBasic;
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
    public class Track
    {
        [Key]
        public int TrackID { get; set; } //primaire sleutel

        [Required]
        [StringLength(100)]
        public string Title { get; set; }
        [StringLength(300)]
        public string Album { get; set; }
        public string Genre { get; set; }

        [Range(1500,int.MaxValue)]
        public int Year { get; set; }

         //Required heeft hier geen nut in ppt staat dat het geen effect heeft op non nullable types
        [Range(1,399)]
        public int BPM { get; set; }

        [Required]
        public string Key { get; set; }

        [JsonIgnore]
        public ICollection<TrackArtist> Artists { get; set; }
    }
}
