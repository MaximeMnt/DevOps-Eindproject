using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace RESTful_API_MaximeMinta_v2.Models
{
    public class URL
    {
        [Key]
        public int urlID { get; set; }

        [Url]
        public string Url { get; set; }
    }
}
