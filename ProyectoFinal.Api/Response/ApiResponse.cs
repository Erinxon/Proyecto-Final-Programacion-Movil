namespace ProyectoFinal.Api.Response
{
    public class ApiResponse<T>
    {
        public ApiResponse()
        {
            Succeeded = true;
        }
        public T Data { get; set; }
        public bool Succeeded { get; set; }
        public string Message { get; set; }
        public int TotalRegistros { get; set; }
    }
}
