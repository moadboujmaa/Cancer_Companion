import React from 'react'
import TextInput from './TextInput'
import InputError from './InputError'

export default function StepOne({ data, setData, errors }) {
  return (
    <>
        <div>
            <TextInput
                id="name"
                name="name"
                value={data.name}
                className="w-full p-2 my-2 border-2 rounded-md outline-none border-main"
                autoComplete="name"
                isFocused={true}
                placeholder="Full Name"
                onChange={(e) => setData('name', e.target.value)}
                required
            />
            <InputError message={errors.name} className="mt-2" />
        </div>

      <div className="mt-4">
          <TextInput
              id="email"
              type="email"
              name="email"
              value={data.email}
              className="w-full p-2 my-2 border-2 rounded-md outline-none border-main"
              autoComplete="username"
              placeholder="Email"
              onChange={(e) => setData('email', e.target.value)}
              required
          />
          <InputError message={errors.email} className="mt-2" />
      </div>

      <div className="mt-4">
          <TextInput
              id="password"
              type="password"
              name="password"
              value={data.password}
              className="w-full p-2 my-2 border-2 rounded-md outline-none border-main"
              autoComplete="new-password"
              placeholder="Password"
              onChange={(e) => setData('password', e.target.value)}
              required
          />

          <InputError message={errors.password} className="mt-2" />
      </div>

      <div className="mt-4">
          <TextInput
              id="password_confirmation"
              type="password"
              name="password_confirmation"
              value={data.password_confirmation}
              className="w-full p-2 my-2 border-2 rounded-md outline-none border-main"
              autoComplete="new-password"
              placeholder="Confirm Password"
              onChange={(e) => setData('password_confirmation', e.target.value)}
              required
          />

          <InputError message={errors.password_confirmation} className="mt-2" />
      </div>
    </>
  )
}
