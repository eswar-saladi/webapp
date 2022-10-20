cd packer
packer init .

packer fmt .
packer validate .

packer build webapp.pkr.hcl

