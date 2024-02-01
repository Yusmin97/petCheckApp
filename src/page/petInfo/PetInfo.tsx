import React from 'react';
import "./PetInfo.css"

function PetInfo() {
  return (
    <div className="container mx-auto p-4">
      <div className="form-box bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="form-element mb-4">
          <input className="form-input" id="name" type="text" placeholder="이름:" />
        </div>
        <div className="form-element mb-4">
          <select className="form-select" id="gender">
            <option value="" disabled selected>
              성별:
            </option>
            <option value="male">수컷</option>
            <option value="female">암컷</option>
          </select>
        </div>
        <div className="form-element mb-4">
          <input className="form-input" id="pet_type" type="text" placeholder="반려동물 종:" />
        </div>
        <div className="form-element mb-4">
          <select className="form-select" id="neutered">
            <option value="" disabled selected>
              중성화 유무:
            </option>
            <option value="yes">O</option>
            <option value="no">X</option>
          </select>
        </div>
        <div className="form-element mb-4">
          <input className="form-input" id="weight" type="text" placeholder="몸무게:" />
        </div>
        <div className="form-element mb-4">
          <input className="form-input" id="birthday" type="date" placeholder="생일:" />
        </div>
        <div className="form-element mb-6">
          <select className="form-select" id="blood_type">
            <option value="" disabled selected>
              혈액형:
            </option>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="AB">AB</option>
          </select>
        </div>
        <div className="form-actions flex items-center justify-between">
          <button
            className="submit-btn bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
          >
            제출
          </button>
        </div>
      </div>
    </div>
  );
}

export default PetInfo;
