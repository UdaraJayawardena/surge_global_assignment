Source code : https://github.com/UdaraJayawardena/surge_global_assignment.git

Rest API to convert  given amount from one currency to another specified currency

Url : http://<BASE_URL>:<PORT>/api/convert
Request Method : POST
Sample Request Body 
{
	"fromCurrency": "LKR",
	"amount": 234.0,
	"toCurrency": "USD"
}

Sample Response 
{
    "message": "Success",
    "data": {
        "amount": 1.1802939281698,
        "currency": "USD"
    }
}
