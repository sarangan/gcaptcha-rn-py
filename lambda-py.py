import json
import http.client, urllib.parse


def lambda_handler(event, context):
    # print("event ", event)
    url = 'https://www.google.com/recaptcha/api/siteverify' 
    body_str = event.get("body")
    body = json.loads(body_str)
    token = body.get("token")
    print("tpokem ", token)
    data = {
      'secret': '', 
      'response': token
    }
    SECRET_KEY = ""
    
    try:
        # response = requests.post(url, data=data)
        # payload = f"secret=${SECRET_KEY}&response=${token}"
        payload = urllib.parse.urlencode(data)
        headers = {"Content-type": "application/x-www-form-urlencoded",
           "Accept": "text/plain"}
           
        conn = http.client.HTTPSConnection("www.google.com")
        headers = {'Content-type': 'application/x-www-form-urlencoded'}
        conn.request("POST", "/recaptcha/api/siteverify", payload, headers)
        res = conn.getresponse()
        data = res.read()
        res = data.decode("utf-8")
        
        res_json = json.loads(res)

        print("response. ", res_json)
        if res_json.get("success") == True and res_json.get('score', 1) > 0.7:
            return(json.dumps({
                "status": "success"
            }))
        else:
            return(json.dumps({
                "status": "failed",
                "error": res_json.get("error-codes")
            }))
            
    
    except Exception as e:
        print("error ", e)
        print("failed 3")
        return(json.dumps({
                "status": "failed"
            }))
