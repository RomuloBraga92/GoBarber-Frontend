import React, { useCallback, useRef, useState } from 'react';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { Link, useHistory } from 'react-router-dom';

import { Container, Content, Background, AnimationContainer } from './styles';
import logo from '../../assets/logo.svg';
import Input from '../../components/Input';
import Button from '../../components/Button';
import getValidationErrors from '../../utils/getValidationErrors';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';

interface SignInFormData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { signIn } = useAuth();
  const { addToast } = useToast();
  const history = useHistory();
  const [loading, setLoading] = useState(false);

  const handleSubmit = useCallback(
    async (data: SignInFormData) => {
      setLoading(true);
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um e-mail válido'),
          password: Yup.string().required('Senha obrigatória'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await signIn({
          email: data.email,
          password: data.password,
        });

        history.push('/dashboard');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }

        addToast({
          type: 'error',
          title: 'Erro na autenticação',
          description: 'Ocorreu um erro ao fazer login, cheque as credenciais.',
        });
      } finally {
        setLoading(false);
      }
    },
    [signIn, addToast, history],
  );

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <img src={logo} alt="Logo" />

          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Faça seu Login</h1>
            <Input
              name="email"
              icon={FiMail}
              type="text"
              placeholder="Digite seu e-mail"
            />
            <Input
              name="password"
              icon={FiLock}
              type="password"
              placeholder="Digite sua senha"
            />
            <Button loading={loading} type="submit">
              Entrar
            </Button>
            <Link to="/forgot_password">Esqueceu sua senha?</Link>
          </Form>
          <Link to="/signup">
            <FiLogIn size={16} />
            Criar conta
          </Link>
        </AnimationContainer>
      </Content>
      <Background />
    </Container>
  );
};

export default SignIn;
