import { useNavigate  } from "react-router-dom";
import { MdEmail, MdLock } from 'react-icons/md';
import { HiUser } from "react-icons/hi2";
import { Button } from '../../components/Button';
import { Header } from '../../components/Header';
import { Input } from '../../components/Input';
import { api } from '../../services/api';
import { useForm } from "react-hook-form";

import { Container, Title, Column, TitleLogin, SubtitleCadastro2, Row, Wrapper, SubtitleCadastro1, LoginText } from './styles';

export const Cadastro = () => 
{
    const navigate = useNavigate()

    const { control, handleSubmit, formState: { errors  } } = useForm({
        reValidateMode: 'onChange',
        mode: 'onChange',
    });

    const onSubmit = async (formData) => {
        try{
            const {data} = await api.post(`/users?name=${formData.username}&email=${formData.email}&senha=${formData.senha}`, 
            {
                "name": formData.username,
                "email": formData.email,
                "senha": formData.senha
            });

            if (data.id)
            {
                navigate("/login");
                return;
            }

            alert("Erro ao cadastrar o usuário")
        }catch(e){
            console.log(e)
        }
    };

    const toLogin = () =>
    {
        navigate("/login")
    }

    return(<>
        <Header />
        <Container>
            <Column>
                <Title>A plataforma para você aprender com experts, dominar as principais tecnologias
                 e entrar mais rápido nas empresas mais desejadas.</Title>
            </Column>
            <Column>
                <Wrapper>
                <TitleLogin>Começe agora grátis</TitleLogin>
                <SubtitleCadastro1>Crie sua conta e make the change._</SubtitleCadastro1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Input placeholder="Nome de Usuário" leftIcon={<HiUser />} name="username" control={control} />
                    {errors.username && <span>Nome de usuário é obrigatório</span>}
                    <Input placeholder="E-mail" leftIcon={<MdEmail />} name="email" control={control} />
                    {errors.email && <span>E-mail é obrigatório</span>}
                    <Input type="password" placeholder="Senha" leftIcon={<MdLock />} control={control} name="senha" />
                    {errors.senha && <span>Senha é obrigatório</span>}
                    <Button title="Criar minha conta" variant="secondary" type="submit"/>
                </form>
                <Row>
                    <SubtitleCadastro1>Ao clicar em "criar minha conta grátis", declaro que aceito as Políticas de Privacidade e os Termos de Uso da DIO.</SubtitleCadastro1>
                </Row>
                <Row>
                    <SubtitleCadastro2>Já tenho conta.</SubtitleCadastro2>
                    <LoginText type="button" onClick={toLogin}>Fazer Login</LoginText>
                </Row>
                </Wrapper>
            </Column>
        </Container>
    </>
    )
}