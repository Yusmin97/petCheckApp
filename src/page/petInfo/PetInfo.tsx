import React from 'react';
import './PetInfo.css';

function PetInfo() {
  return (
    <div className="container">
      <div className='petInfoTitle'>반려동물 정보</div>
      <div className="petName">
        <input className="petNameInput" id="name" type="text" placeholder="이름:" />
      </div>
      <div className="petGender">
        <select className="petGenderSelect" id="gender">
          <option value="" disabled selected>
            성별:
          </option>
          <option value="male">수컷</option>
          <option value="female">암컷</option>
        </select>
      </div>
      <div className="petType">
        <input className="petTypeInput" id="pet_type" type="text" placeholder="반려동물 종:" />
      </div>
      <div className="petNeutered">
        <select className="petNeuteredSelect" id="neutered">
          <option value="" disabled selected>
            중성화 유무:
          </option>
          <option value="yes">O</option>
          <option value="no">X</option>
        </select>
      </div>
      <div className="petWeight">
        <input className="petWeightInput" id="weight" type="text" placeholder="몸무게:" />
      </div>
      <div className="petBirth">
        <input className="petBirthInput" id="birthday" type="date" placeholder="생일:" />
      </div>
      <div className="petBlood">
        <select className="petBloodSelect" id="blood_type">
          <option value="" disabled selected>
            혈액형:
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
