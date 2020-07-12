import React, { useCallback, useRef, ChangeEvent, useState } from 'react';
import { FiArrowLeft, FiMail, FiLock, FiUser, FiCamera } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { Link, useHistory } from 'react-router-dom';

import {
  Container,
  Content,
  AnimationContainer,
  AvatarProfile,
} from './styles';
import Input from '../../components/Input';
import Button from '../../components/Button';
import getValidationErrors from '../../utils/getValidationErrors';
import api from '../../services/api';
import { useToast } from '../../context/ToastContext';
import { useAuth } from '../../context/AuthContext';
import profile from '../../assets/sign-in-background.png';

interface ProfileFormData {
  name: string;
  email: string;
  old_password: string;
  password: string;
  confirmPassword: string;
}

const Profile: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const history = useHistory();
  const { addToast } = useToast();
  const { user, updateUser } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleSubmit = useCallback(
    async (data: ProfileFormData) => {
      try {
        setLoading(true);
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um e-mail válido'),
          old_password: Yup.string(),
          password: Yup.string().when('old_password', {
            is: val => !!val.length,
            then: Yup.string()
              .required('Nova senha obrigatório')
              .min(6, 'Mínimo de 6 dígitos'),
            otherwise: Yup.string(),
          }),
          confirmPassword: Yup.string()
            .when('old_password', {
              is: val => !!val.length,
              then: Yup.string()
                .required('Confirmação de senha obrigatório')
                .min(6, 'Mínimo de 6 dígitos'),
              otherwise: Yup.string(),
            })
            .oneOf(
              [Yup.ref('password'), null],
              'As senhas precisam ser iguais',
            ),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const { name, email, old_password, password, confirmPassword } = data;

        const formData = {
          name,
          email,
          ...(old_password
            ? {
                old_password,
                password,
                confirmPassword,
              }
            : {}),
        };

        const response = await api.put('/profile', formData);

        updateUser(response.data);

        addToast({
          type: 'success',
          title: 'Perfil atualizado',
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
          title: 'Erro na atualização do perfil',
          description:
            'Ocorreu um erro ao fazer a atualização do perfil, tente novamente.',
        });
      } finally {
        setLoading(false);
      }
    },
    [addToast, history, updateUser],
  );

  const handleAvatarChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      if (event.target.files) {
        setLoading(true);
        const data = new FormData();

        data.append('avatar', event.target.files[0]);

        api.patch('/users/avatar', data).then(response => {
          updateUser(response.data);

          addToast({
            type: 'success',
            title: 'Avatar atualizado com sucesso!',
          });
        });
      }
      setLoading(false);
    },
    [addToast, updateUser],
  );

  return (
    <Container>
      <header>
        <div>
          <Link to="/dashboard">
            <FiArrowLeft />
          </Link>
        </div>
      </header>

      <Content>
        <AnimationContainer>
          <Form
            ref={formRef}
            onSubmit={handleSubmit}
            initialData={{
              name: user.name,
              email: user.email,
            }}
          >
            <AvatarProfile>
              <img
                src={user.avatar_url ? user.avatar_url : profile}
                alt={user.name}
              />
              <label htmlFor="avatar">
                <FiCamera />
                <input type="file" id="avatar" onChange={handleAvatarChange} />
              </label>
            </AvatarProfile>
            <h1>Meu perfil</h1>
            <Input name="name" icon={FiUser} placeholder="Nome" />
            <Input
              name="email"
              type="email"
              icon={FiMail}
              placeholder="E-mail"
            />
            <Input
              containerStyle={{ marginTop: 28 }}
              name="old_password"
              icon={FiLock}
              type="password"
              placeholder="Senha atual"
            />
            <Input
              name="password"
              icon={FiLock}
              type="password"
              placeholder="Nova senha"
            />
            <Input
              name="confirmPassword"
              icon={FiLock}
              type="password"
              placeholder="Confirmar senha"
            />
            <Button loading={loading} type="submit">
              Atualizar perfil
            </Button>
          </Form>
        </AnimationContainer>
      </Content>
    </Container>
  );
};

export default Profile;
