using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Runtime.Serialization;
using System.Threading.Tasks;

namespace RESTful_API_MaximeMinta_v2
{
    [DataContract]
    public class TrackArtist
    {
        public int TrackID { get; set; }
        [DataMember]
        public Track Track { get; set; }

        public int ArtistID { get; set; }
        [DataMember]
        public Artist Artist { get; set; }

    }
}
