import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { useAuth } from '../../authContext/authProvider';
import './PetInfo.css';

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
    <div className="container">
      <div className="petInfoTitle">반려동물 정보</div>
      <form onSubmit={handleSubmit}>
        <div className="petEmogi">
          <label htmlFor="emogi" className="placeholderEmogi">
            종류:
          </label>
          <select className="petEmogiSelect text-indent60" id="emogi" name="pet_emogi" onChange={handleChange}>
            <option value=""></option>
            <option value="1F436">강아지</option>
            <option value="1F431">고양이</option>
          </select>
        </div>
        <div className="petName">
          <label htmlFor="name" className="placeholderName">
            이름:
          </label>
          <input className="petNameInput text-indent60" id="name" type="text" name="pet_name" onChange={handleChange} />
        </div>
        <div className="petGender">
          <label htmlFor="gender" className="placeholderGender">
            성별:
          </label>
          <select className="petGenderSelect text-indent60" id="gender" name="pet_gender" onChange={handleChange}>
            <option value=""></option>
            <option value="male">수컷</option>
            <option value="female">암컷</option>
          </select>
        </div>
        <div className="petType">
          <label htmlFor="pet_type" className="placeholderType">
            반려동물 종:
          </label>
          <input className="petTypeInput text-indent110" id="pet_type" type="text" name="pet_type" onChange={handleChange} />
        </div>
        <div className="petNeutered">
          <label htmlFor="neutered" className="placeholderNeutered">
            중성화 유무:
          </label>
          <select className="petNeuteredSelect text-indent110" id="neutered" name="pet_neutered" onChange={handleChange}>
            <option value=""></option>
            <option value="yes">O</option>
            <option value="no">X</option>
          </select>
        </div>
        <div className="petWeight">
          <label htmlFor="weight" className="placeholderWeight">
            몸무게:
          </label>
          <input className="petWeightInput text-indent75" id="weight" type="text" name="pet_weight" onChange={handleChange} />
        </div>
        <div className="petBirth">
          <label htmlFor="birthday" className="placeholderBirth">
            생일:
          </label>
          <input className="petBirthInput text-indent30" id="birthday" type="date" name="pet_birth" onChange={handleChange} />
        </div>
        <div className="petBlood">
          <label htmlFor="blood_type" className="placeholderBlood">
            혈액형:
          </label>
          <select className="petBloodSelect text-indent75" id="blood_type" name="pet_blood" onChange={handleChange}>
            <option value=""></option>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="AB">AB</option>
          </select>
        </div>
        <div className="petInfoButton">
          <button className="petInfoBtn" type="submit">
            제출
          </button>
        </div>
      </form>
    </div>
  );
}

export default PetInfoForm;
