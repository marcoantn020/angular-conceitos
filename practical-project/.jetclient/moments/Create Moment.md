```toml
name = 'Create Moment'
method = 'POST'
url = '{{baseUrl}}/moments'
sortWeight = 2000000
id = 'ca69f941-7a91-4427-9837-a28fd0326eb5'

[[headers]]
key = 'Content-Type'
value = 'application/json'

[body]
type = 'JSON'
raw = '''
{
  "title": "Praia do Guaruja",
  "description": "Praia muito mais muito bonita"
}'''
```
