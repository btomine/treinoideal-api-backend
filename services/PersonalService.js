const Database = require("../models/index");
const bcrypt = require('bcryptjs');

class PersonalService {
    constructor() {
        this.Personal = Database["tb_personal"];
    }

    async insert(personal) {
        let {nome, email, senha, data, cref} = personal;

        senha = await this.encripta(senha);

        console.log(data);

        let dados = {
            nm_personal:nome,
            nm_email:email,
            nm_senha:senha,
            dt_nascimento:data,
            cd_cref:cref
        };
        
        let result = await this.Personal.create(dados);
        return result;
    }

    async lista() {
        let result = await this.Personal.findAll({
            attributes: [
                ['cd_personal','codigo'], 
                ['nm_personal', 'nome'],
                ['nm_email', 'email'],
                ['dt_nascimento', 'nascimento'],
                ['cd_cref', 'cref'],
            ]
          });
        return result;
    }

    async detalhes (id) {
        let result = await this.Personal.findByPk(id,{
            raw: true,
            attributes: [
                ['cd_personal','codigo'], 
                ['nm_personal', 'nome'],
                ['nm_email', 'email'],
                [Database.Sequelize.fn('date_format', Database.Sequelize.col('dt_nascimento'), '%d/%m/%Y'), 'nascimento'],
                ['cd_cref', 'cref'],
            ]
        });
        return result;
    }

    async atualiza(id,personal) {

        let {nome, email, senha, data} = personal;

        senha = await this.encripta(senha);

        let dados = {
            nm_personal:nome,
            nm_email:email,
            nm_senha:senha,
            dt_nascimento:data
        };

        let result = await this.Personal.update(dados,{
            where: {
                cd_personal: id
            }
        });
        return result;
    }

    async deleta(id) {
        let result = await this.Personal.destroy({
            where: {
                cd_personal: id
            }
        });
        return result;
    }

    async encripta(senha) {
        if (senha != undefined) {
            let salt = bcrypt.genSaltSync(10);
            senha = bcrypt.hashSync(senha,salt);
        }

        return senha;
    }

    async validaSenha(login,senha) {
        return bcrypt.compareSync(login,senha);        
    }

    async findPersonal(login) {
        let {email,senha} = login;

        let result = await this.Personal.findOne({
            raw:true,
            attributes: [
                ['cd_personal','codigo'], 
                ['nm_personal', 'nome'],
                ['nm_senha','pwd'],
                ['nm_email', 'email'],
                ['dt_nascimento', 'nascimento'],
                ['cd_cref', 'cref'],
            ],
            where:{
                nm_email:email
            }
        });

        let pwd = await this.validaSenha(senha,result.pwd);
        
        if (result != undefined && pwd) {
            
            return result = {
                codigo:result.codigo,
                email:result.email,
                cref:result.cref
            };

        }

        throw "Usuario não identificado";

    }

    async personalExists (id) {
        let result = await this.Personal.findByPk(id);

        if (result == undefined) {
            throw {
                "name": "ProcessoInsert",
                "errors":[{
                    "message": "Personal não existe"
                }]
            };
        }

        return result;
    }
    
    async personalSenhaExists (email,cref) {
        
        if (email == undefined || cref == undefined) {
            throw {
                "name": "ProcessoValidate",
                "errors":[{
                    "message": "Personal não existe"
                }]
            };
        }

        let result = await this.Personal.findOne({
            raw:true,
            attributes: [
                ['cd_personal','codigo'], 
                ['nm_personal', 'nome'],
                ['nm_email', 'email'],
                ['cd_cref', 'cref'],
            ],
            where:{
                nm_email:email,
                cd_cref:cref
            }
        });

        return result;
    }

    async atualizaSenha(id,personal) {

        let {senha} = personal;

        senha = await this.encripta(senha);

        let dados = {
            nm_senha:senha
        };

        let result = await this.Personal.update(dados,{
            where: {
                cd_personal: id
            }
        });
        return result;
    }
}

module.exports = new PersonalService();