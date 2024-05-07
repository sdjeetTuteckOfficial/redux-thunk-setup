import { useForm, Controller } from 'react-hook-form';
import { useEffect } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  TextField,
  Button,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from '@mui/material';
import { fetchMyData } from '../redux/slice';
import { useDispatch, useSelector } from 'react-redux';

const schema = yup.object().shape({
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  country: yup.string().required('Phone number is required'),
  post: yup.string().required('Post is required'),
});

const post = [
  { code: 'jd980s-0', label: 'Manager' },
  { code: 'df9s-0', label: 'Salesman' },
  { code: 'd80-kj', label: 'Hamba' },
  // Add more countries as needed
];

const MyForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log(data);
  };
  const dispatch = useDispatch();
  const reduxData = useSelector((state) => state.mySlice.data);
  console.log('countries', reduxData);
  const loading = useSelector((state) => state.mySlice.loading);

  useEffect(() => {
    const requests = [
      {
        url: 'http://localhost:3001/api/countries',
        method: 'GET',
        // data: {},
        // token: 'token1',
      },
    ];

    dispatch(fetchMyData(requests));
  }, [dispatch]);

  return (
    <>
      {loading && <h1>load...</h1>}
      {!loading && reduxData && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name='firstName'
            control={control}
            defaultValue=''
            render={({ field }) => (
              <TextField
                {...field}
                label='First Name'
                error={!!errors.firstName}
                helperText={errors.firstName?.message}
              />
            )}
          />
          <br />
          <Controller
            name='lastName'
            control={control}
            defaultValue=''
            render={({ field }) => (
              <TextField
                {...field}
                label='Last Name'
                error={!!errors.lastName}
                helperText={errors.lastName?.message}
              />
            )}
          />
          <br />
          <Controller
            name='email'
            control={control}
            defaultValue=''
            render={({ field }) => (
              <TextField
                {...field}
                label='Email'
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            )}
          />
          <br />
          <Controller
            name='country'
            control={control}
            defaultValue=''
            render={({ field }) => (
              <FormControl>
                <InputLabel>Country</InputLabel>
                <Select
                  {...field}
                  label='Country'
                  error={!!errors.country}
                  helperText={errors.country?.message}
                >
                  {reduxData[0]?.map((country, index) => (
                    <MenuItem key={index} value={country.id}>
                      {country.value}
                    </MenuItem>
                  ))}
                </Select>
                <TextField
                  label='Number'
                  {...field}
                  style={{ marginLeft: 10, width: '60%' }}
                  error={!!errors.country}
                  helperText={errors.country?.message}
                />
              </FormControl>
            )}
          />
          <br />
          <Controller
            name='post'
            control={control}
            defaultValue=''
            render={({ field }) => (
              <FormControl>
                <InputLabel>Post</InputLabel>
                <Select
                  {...field}
                  label='Post'
                  error={!!errors.post}
                  helperText={errors.post?.message}
                >
                  {post.map((post, index) => (
                    <MenuItem key={index} value={post.code}>
                      {post.label}
                    </MenuItem>
                  ))}
                </Select>
                <TextField
                  label='Number'
                  {...field}
                  style={{ marginLeft: 10, width: '60%' }}
                  error={!!errors.post}
                  helperText={errors.post?.message}
                />
              </FormControl>
            )}
          />
          <br />
          <Button type='submit' variant='contained' color='primary'>
            Submit
          </Button>
        </form>
      )}
    </>
  );
};

export default MyForm;
