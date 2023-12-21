# Environment
In this document, we will describe important and good-to-know facts about the `.env` File
TODO: Complete documentation

## Topics

```json
[
  {
    "identifier": "verw_land_f",
    "title": "Verwaltung Landkreise",
    "description": "analyzes federal states and neighbouring states.",
    "__source__": "spatialyzer_demo.verw_land_f",
    "__attributes__": ["id00", "name", "bundesland", "geom"],
    "__supports__": ["intersect","within", "nearestNeighbour"]
  },{
    "identifier": "hoehe2m_r",
    "title": "Höhenwerte für Dresden",
    "description": "Contains information on terrain elevation and surface elevation in Saxony.",
    "__source__": "spatialyzer_demo.hoehe2m_r",
    "__attributes__": [],
    "__supports__": ["valuesAtPoint"]
  }
]
```

## database
## Topics

```text
#postgres
db_postgres_type: postgres 
db_postgres_host: localhost
db_postgres_port: 5432
db_postgres_username: postgres
db_postgres_password: geobakery
db_postgres_database: postgres
db_postgres_synchronize: false
db_postgres_logging: true
```