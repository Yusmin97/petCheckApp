import React from 'react';
import './PetInfo.css';

function PetInfo() {
  return (
    <div className="container">
      <div className="petInfoTitle">반려동물 정보</div>
      <div className="petName">
        <label htmlFor="name" className="placeholderName">
          이름:
        </label>
        <input className="petNameInput" id="name" type="text" />
      </div>
      <div className="petGender">
        <label htmlFor="gender" className="placeholderGender">
          성별:
        </label>
        <select className="petGenderSelect" id="gender">
          <option value="" disabled selected></option>
          <option value="male">수컷</option>
          <option value="female">암컷</option>
        </select>
      </div>
      <div className="petType">
        <label htmlFor="pet_type" className="placeholderType">
          반려동물 종:
        </label>
        <input className="petTypeInput" id="pet_type" type="text" />
      </div>
      <div className="petNeutered">
        <label htmlFor="neutered" className="placeholderNeutered">
          중성화 유무:
        </label>
        <select className="petNeuteredSelect" id="neutered">
          <option value="" disabled selected></option>
          <option value="yes">O</option>
          <option value="no">X</option>
        </select>
      </div>
      <div className="petWeight">
        <label htmlFor="weight" className="placeholderWeight">
          몸무게:
        </label>
        <input className="petWeightInput" id="weight" type="text" />
      </div>
      <div className="petBirth">
        <label htmlFor="birthday" className="placeholderBirth">
          생일:
        </label>
        <input className="petBirthInput" id="birthday" type="date" />
      </div>
      <div className="petBlood">
        <label htmlFor="blood_type" className="placeholderBlood">
          혈액형:
        </label>
        <select className="petBloodSelect" id="blood_type">
          <option value="" disabled selected>
          </option>
          <option value="A">A</option>
          <option value="B">B</option>
          <option value="AB">AB</option>
        </select>
      </div>
      <div className="petInfoButton">
        <button className="petInfoBtn">제출</button>
      </div>
    </div>
  );
}

export default PetInfo;
