{"id":"generated.js",
"sources":[
	{
		"name":"Application",
		"extends":"Object",
		"schema":{
			"extends":{"$ref":"../Class/Object"},
			"description":"An application that can be run from within Lucid",
			"properties":{
				"name":{
					"type":"string",
					"description":"The display name of the application"
					},
				"sysname":{
					"type":"string",
					"description":"The unique system name of the application"
					},
				"owner":{"$ref":"../Class/User"}
				},
			"instances":{"$ref":"../Application/"},
			"prototype":{
				}
			}
		},
	{
		"name":"Keyring",
		"extends":"Object",
		"schema":{
			"extends":{"$ref":"../Class/Object"},
			"prototype":{
				},
			"description":"Holds encrypted Key objects",
			"properties":{
				"items":{
					"type":"array",
					"default":[]
					},
				"owner":{
					"type":"object"
					}
				}
			}
		},
	{
		"name":"Key",
		"extends":"Object",
		"schema":{
			"extends":{"$ref":"../Class/Object"},
			"prototype":{
				},
			"description":"Contain information for use by an application",
			"properties":{
				"keyring":{
					"type":"object"
					},
				"data":{
					"type":"object",
					"default":{
						}
					},
				"application":{
					"type":"object",
					"description":"The application that uses this key"
					}
				}
			}
		},
	{
		"name":"Configuration",
		"extends":"Object",
		"schema":{
			"extends":{"$ref":"../Class/Object"},
			"prototype":{
				},
			"properties":{
				"owner":{
					"type":"object"
					},
				"data":{
					"type":"object",
					"default":{
						}
					}
				},
			"description":"User configuration"
			}
		},
	{
		"name":"Group",
		"extends":"Object",
		"schema":{
			"extends":{"$ref":"../Class/Object"},
			"prototype":{
				},
			"properties":{
				"members":{
					"type":"array",
					"default":[]
					},
				"name":{
					"type":"string"
					}
				},
			"description":"A way of organizing users"
			}
		},
	{
		"name":"Quota",
		"extends":"Object",
		"schema":{
			"extends":{"$ref":"../Class/Object"},
			"prototype":{
				},
			"description":"Holds quota information for user/group disk usage",
			"properties":{
				"user":{
					"type":"object"
					},
				"size":{
					"type":"integer",
					"default":0
					}
				}
			}
		},
	{
		"name":"Share",
		"extends":"Object",
		"schema":{
			"extends":{"$ref":"../Class/Object"},
			"prototype":{
				},
			"properties":{
				"name":{
					"type":"string"
					},
				"description":{
					"type":"string"
					},
				"groups":{
					"type":"array"
					}
				}
			}
		}]
}