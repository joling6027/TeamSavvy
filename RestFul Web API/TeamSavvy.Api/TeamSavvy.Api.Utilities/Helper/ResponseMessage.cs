using System;
using System.Collections.Generic;
using System.Text;

namespace TeamSavvy.Api.BusinessModel.Helper
{
    /// <summary>
    /// ResponseMessage class.
    /// 
    /// A **response Message** sent by all the controllers for a particular response.
    /// </summary>
    public class ResponseMessage
    {
        #region Constructors
        /// <summary>
        /// This constructor is being used to init the properties.
        /// The data parameter is object and allows for any object to be
        /// passed in.
        /// </summary>
        /// <param name="success">whether the status is true or false. 200 status will indicate a true result.</param>
        /// <param name="data">pass in a custom class as per Api. Data will be used on the angular side.</param>
        /// <param name="message">message.</param>
        public ResponseMessage(bool success = false, object data = null, Message message = null)
        {
            Success = success;
            Response = data;
            Message = message;
        }
        #endregion

        #region Public Properties
        /// <summary>Success: indicating true of false.</summary>
        /// <example>true</example>
        public bool Success { get; }

        /// <summary>
        /// Data will be passed in a custom class as per Api. Data will be used on the angular side.
        /// </summary>
        public object Response { get; }

        /// <summary>
        /// A Message response.
        /// </summary>
        public Message Message { get; }
        #endregion
    }
}
