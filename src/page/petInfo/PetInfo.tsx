import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { useAuth } from '../../authContext/authProvider';

interface PetInfo {
  pet_name: string;
  pet_gender: string;
  pet_type: string;
  pet_neutered: string;
  pet_weight: string;
  pet_birth: string;
  pet_blood: string;
}

function PetInfoForm() {
  const [formData, setFormData] = useState<PetInfo>({
    pet_name: '',
    pet_gender: '',
    pet_type: '',
    pet_neutered: '',
    pet_weight: '',
    pet_birth: '',
    pet_blood: '',
  });
  const { authState } = useAuth();
  const navigate = useNavigate();

  console.log('전역 상태:', authState);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/pet-info', {
        ...formData,
        user_id: authState.userId, // 사용자의 아이디를 함께 전송
      });
      console.log(response.data);
      navigate('/main')
      // handle success
    } catch (error) {
      console.error('Error:', error);
      // handle error
    }
  };

  return (
    <div className="bg-yellow-100 w-screen h-screen flex justify-center items-center flex-col">
      <div className="w-64 h-16 flex justify-center items-center font-inter text-center text-xl">반려동물 정보</div>
      <form onSubmit={handleSubmit}>
        <div className="bg-yellow-300 w-80 h-10 flex items-center relative rounded-full mt-2">
          <label htmlFor="emogi" className="placeholderEmogi absolute top-1/2 left-4 transform -translate-y-1/2 pointer-events-none text-black">
            종류:
          </label>
          <select className="petEmogiSelect w-72 h-10 font-inter text-base bg-transparent border-none pl-14" id="emogi" name="pet_emogi" onChange={handleChange}>
            <option value=""></option>
            <option value="1F436">강아지</option>
            <option value="1F431">고양이</option>
          </select>
        </div>
        <div className="bg-yellow-300 w-80 h-10 flex items-center relative rounded-full mt-2">
          <label htmlFor="name" className="placeholderName absolute top-1/2 left-4 transform -translate-y-1/2 pointer-events-none text-black">
            이름:
          </label>
          <input className="petNameInput w-72 h-10 font-inter text-base bg-transparent border-none pl-16" id="name" type="text" name="pet_name" onChange={handleChange} />
        </div>
        <div className="bg-yellow-300 w-80 h-10 flex items-center relative rounded-full mt-2">
          <label htmlFor="gender" className="placeholderGender absolute top-1/2 left-4 transform -translate-y-1/2 pointer-events-none text-black">
            성별:
          </label>
          <select className="petGenderSelect w-72 h-10 font-inter text-base bg-transparent border-none pl-14" id="gender" name="pet_gender" onChange={handleChange}>
            <option value=""></option>
            <option value="male">수컷</option>
            <option value="female">암컷</option>
          </select>
        </div>
        <div className="bg-yellow-300 w-80 h-10 flex items-center relative rounded-full mt-2">
          <label htmlFor="pet_type" className="placeholderType absolute top-1/2 left-4 transform -translate-y-1/2 pointer-events-none text-black">
            반려동물 종:
          </label>
          <input className="petTypeInput w-72 h-10 font-inter text-base bg-transparent border-none pl-28" id="pet_type" type="text" name="pet_type" onChange={handleChange} />
        </div>
        <div className="bg-yellow-300 w-80 h-10 flex items-center relative rounded-full mt-2">
          <label htmlFor="neutered" className="placeholderNeutered absolute top-1/2 left-4 transform -translate-y-1/2 pointer-events-none text-black">
            중성화 유무:
          </label>
          <select className="petNeuteredSelect w-72 h-10 font-inter text-base bg-transparent border-none pl-28" id="neutered" name="pet_neutered" onChange={handleChange}>
            <option value=""></option>
            <option value="yes">O</option>
            <option value="no">X</option>
          </select>
        </div>
        <div className="bg-yellow-300 w-80 h-10 flex items-center relative rounded-full mt-2">
          <label htmlFor="weight" className="placeholderWeight absolute top-1/2 left-4 transform -translate-y-1/2 pointer-events-none text-black">
            몸무게:
          </label>
          <input className="petWeightInput w-72 h-10 font-inter text-base bg-transparent border-none pl-20" id="weight" type="text" name="pet_weight" onChange={handleChange} />
        </div>
        <div className="bg-yellow-300 w-80 h-10 flex items-center relative rounded-full mt-2">
          <label htmlFor="birthday" className="placeholderBirth absolute top-1/2 left-4 transform -translate-y-1/2 pointer-events-none text-black">
            생일:
          </label>
          <input className="petBirthInput w-72 h-10 font-inter text-base bg-transparent border-none pl-20" id="birthday" type="date" name="pet_birth" onChange={handleChange} />
        </div>
        <div className="bg-yellow-300 w-80 h-10 flex items-center relative rounded-full mt-2">
          <label htmlFor="blood_type" className="placeholderBlood absolute top-1/2 left-4 transform -translate-y-1/2 pointer-events-none text-black">
            혈액형:
          </label>
          <select className="petBloodSelect w-72 h-10 font-inter text-base bg-transparent border-none pl-20" id="blood_type" name="pet_blood" onChange={handleChange}>
            <option value=""></option>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="AB">AB</option>
          </select>
        </div>
        <div className="petInfoButton">
          <button className="bg-yellow-300 w-32 h-12 rounded-full mt-10 ml-60 border-none"type="submit">
            제출
          </button>
        </div>
      </form>
    </div>
  );
}

export default PetInfoForm;
