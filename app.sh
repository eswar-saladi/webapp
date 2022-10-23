# upgrading the libraries
sudo apt-get update
sudo apt-get upgrade -y  

# installing dependencies

sudo apt install -y gcc-c++ make
sudo apt-get install -y nodejs
sudo apt install npm postgresql postgresql-contrib unzip -y 
# starting postgres
sudo systemctl start postgresql.service  

sudo npm cache clean -f
sudo npm install -g n
sudo n 14

# setup database
sudo -u postgres psql -c "ALTER USER postgres WITH PASSWORD 'postgres';"
sudo -u postgres psql -c "CREATE DATABASE webapp;" 



cd ~/ && unzip webapp.zip
cd webapp



npm install

npx knex migrate:latest


sudo ln -s ~/webapp/webapp.service /lib/systemd/system/webapp.service
sudo systemctl daemon-reload
sudo systemctl enable webapp.service
sudo systemctl start webapp.service
