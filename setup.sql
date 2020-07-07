CREATE USER webappdbuser WITH PASSWORD='bK100200'

EXECUTE sp_addrolemember db_datareader, 'webappdbuser'
EXECUTE sp_addrolemember db_datawriter, 'webappdbuser'

CREATE TABLE users
(
    id INT IDENTITY PRIMARY KEY,
    name VARCHAR(255) ,
    email VARCHAR(255)
)

select *
from users 