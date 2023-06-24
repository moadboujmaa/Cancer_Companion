import { useEffect, useState } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import PrimaryButton from '@/Components/PrimaryButton';
import { Head, Link, useForm } from '@inertiajs/react';
import { BsArrowRight, BsArrowLeft } from 'react-icons/bs'
import { MdOutlineDone } from 'react-icons/md'
import StepOne from '@/Components/StepOne';
import StepTwo from '@/Components/StepTwo';
import StepThree from '@/Components/StepThree';
import SecondaryButton from '@/Components/SecondaryButton';

export default function Register() {
	const { data, setData, post, processing, errors, reset } = useForm({
		name: '',
		email: '',
		password: '',
		gender: 'male',
		country: null,
		avatar: null,
		password_confirmation: '',
		role: 'sick',
		couldHelp: null
	});
	const [currentStep, setCurrentStep] = useState(1)
	const info = ['Personal Info', 'More Data', 'More Data 2']
	console.log(data)
	useEffect(() => {
		return () => {
			reset('password', 'password_confirmation');
		};
	}, []);

	const submit = (e) => {
		e.preventDefault();
		post(route('register'));
		if (errors) {
			setCurrentStep(1)
		}
	};

	return (
		<GuestLayout>
			<Head title="Register" />
			<div>
				<div className='flex justify-center w-full'>
					<img src="images/logo.svg" alt="logo" className='w-48 mb-3'/>
				</div>
				<div className="text-center font-semibold text-main mb-6 flex items-center justify-center gap-[50px]">
					{
						info.map((item, index) => <div key={index} className='flex flex-col items-center text-center'>
							<div key={index} className={`rounded-full border-2 border-main w-[40px] h-[40px] mx-2 flex items-center justify-center bg-white text-main ${currentStep === index+1 && 'active'} ${index+1 < currentStep && 'done'}`}>
								{index+1 < currentStep ? <MdOutlineDone /> : <p>{index + 1}</p>}
							</div>
							<p className='text-center'>{item}</p>
						</div>
						) 
					}
				</div>
				<form onSubmit={submit} className='w-[600px] m-auto' encType='multipart/form-data' >
					{currentStep === 1 
							? <StepOne data={data} setData={setData} errors={errors} /> 
						: currentStep === 2 
							? <StepTwo data={data} setData={setData} errors={errors} /> 
						: currentStep === 3 
							? <StepThree data={data} setData={setData} errors={errors} />
						: <StepThree data={data} setData={setData} errors={errors} />}
					<div className={`py-2 grid ${currentStep === 1 ? 'grid-cols-1' : 'grid-cols-2'} gap-3`}>
						{currentStep !== 1 && 
						// Active in Step Second And Last For Going To The Previous Step
						<SecondaryButton type='button' 
							className='flex items-center justify-center gap-2 py-2 font-semibold bg-white border-2 rounded-md text-main border-main'
							onClick={() => {
								setCurrentStep(prev => prev-1)
							}}
						>
							<BsArrowLeft size={18}/> <span>Previous</span>
						</SecondaryButton>}
						{ currentStep === 3 ? 
						// Active In the Last Step To Submit Form
							<PrimaryButton 
								type="button" 
								onClick={() => {
									setCurrentStep(prev => prev+1)
								}}
								className='flex items-center justify-center gap-2 py-2 text-white border-2 rounded-md cursor-pointer border-main btn'
							>
								<span>Submit</span>
							</PrimaryButton>
						: currentStep === 4 ?
							<PrimaryButton 
								type="submit" 
								className='flex items-center justify-center gap-2 py-2 text-white border-2 rounded-md cursor-pointer border-main btn'
							>
								<span>Submit</span>
							</PrimaryButton>
						: 
						// Active In The First And Second Step For Going To The Next Step
							<PrimaryButton type="button" onClick={() => {
									setCurrentStep(prev => prev+1)
								}} className='flex items-center justify-center gap-2 py-2 text-white border-2 rounded-md cursor-pointer border-main btn'>
								<span>Next</span><BsArrowRight size={18} /> 
							</PrimaryButton>
						}
					</div>
				</form>
				<p className='mt-2 font-semibold text-center text-gray-900'>
					Already have an account ? 
					<Link
						href={route('login')}
						className='font-semibold underline cursor-pointer text-main'
					> Sign In</Link>
				</p>
			</div>
		</GuestLayout>
  );
}
