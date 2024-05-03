using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AplicacaoClientes.Helpers
{
    public class DataTableResult
    {
        /// <summary>
        /// The draw counter that this object is a response to - from the draw parameter sent as part of the data request. Note that it is strongly recommended for security reasons that you cast this parameter to an integer, rather than simply echoing back to the client what it sent in the draw parameter, in order to prevent Cross Site Scripting (XSS) attacks.
        /// </summary>
        public int draw { get; set; }
        /// <summary>
        /// Total records, before filtering (i.e. the total number of records in the database)
        /// </summary>
        public int recordsTotal { get; set; }
        private int _recordsFiltered;
        /// <summary>
        /// Total records, after filtering (i.e. the total number of records after filtering has been applied - not just the number of records being returned for this page of data).
        /// </summary>
        public int recordsFiltered
        {
            get { return _recordsFiltered <= 0 ? recordsTotal : _recordsFiltered; }
            set { _recordsFiltered = value; }
        }
        /// <summary>
        /// The data to be displayed in the table. This is an array of data source objects, one for each row, which will be used by DataTables. Note that this parameter's name can be changed using the ajax option's dataSrc property.
        /// </summary>
        public IEnumerable<object> data { get; set; }
        /// <summary>
        /// Optional: If an error occurs during the running of the server-side processing script, you can inform the user of this error by passing back the error message to be displayed using this parameter. Do not include if there is no error.
        /// </summary>
        public string error { get; set; }

        public int distinctRecordsTotal { get; set; }
    }
}