import { useState, useEffect } from 'react';
import { SCREENS } from '../../constants/screens';
import Modal from './Modal';
import '../../styles/list.css';
import api from '../../utils/api';
import { programMap, areaMap, gbnMap } from '../../utils/mapping';

export const TrainingListScreen = ({ onNavigate }) => {
  const [trainings, setTrainings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchInput, setSearchInput] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('');
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [filterOptions, setFilterOptions] = useState([]);
  const [tempChecked, setTempChecked] = useState([]);
  const [appliedFilter, setAppliedFilter] = useState([]);

  // 교육 목록 불러오기
  const getTrainingList = async () => {
    setLoading(true);
    try {
      const query = new URLSearchParams();

      if (appliedFilter.length > 0) {
        const { area1, gbn } = getQueryParams(appliedFilter);
        if (area1) query.append('area1', area1);
        if (gbn) query.append('gbn', gbn);
      }

      if (searchTerm) query.append('keyword', searchTerm);

      const url = `/api/educations?program=both${
        query.toString() ? `&${query.toString()}` : ''
      }`;
      console.log('✅ 호출한 url:', url);
      const res = await api.get(url);
      setTrainings(res.data);
      console.log('✅ API 응답 성공:', res.data);
    } catch (err) {
      console.error('❌ API 호출 실패:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getTrainingList();
  }, [appliedFilter, searchTerm]);

  // 상세조건 다루는 함수
  const handleFilterSelect = (filter) => {
    setSelectedFilter(filter);

    switch (filter) {
      case '지역':
        setFilterOptions(['서울', '경기', '인천']);
        break;
      case '훈련':
        setFilterOptions([
          '일반과정',
          '인터넷과정',
          '혼합과정',
          '스마트혼합훈련',
        ]);
        break;
      default:
        setFilterOptions([]);
    }

    setTempChecked([]);
    setShowFilterModal(true);
  };

  // 체크박스 핸들러
  const handleTempCheck = (option) => {
    setTempChecked((prev) =>
      prev.includes(option)
        ? prev.filter((item) => item !== option)
        : [...prev, option]
    );
  };

  // 모달 열릴 때 기존 적용 조건 있으면 체크 표시
  useEffect(() => {
    if (showFilterModal) {
      setTempChecked([...appliedFilter]);
    }
  }, [showFilterModal]);

  // 적용 버튼 핸들러
  const handleApplyFilter = () => {
    setAppliedFilter(tempChecked);
    setShowFilterModal(false);
    setShowDropdown(false);
  };

  // 적용된 조건 제거 버튼 핸들러
  const handleRemoveAppliedFilter = (item) => {
    setAppliedFilter((prev) => prev.filter((i) => i !== item));
  };

  // 상세조건 쿼리파라미터 배열 생성
  const getQueryParams = (appliedFilter) => {
    let area1 = [];
    let gbn = [];

    appliedFilter.forEach((filter) => {
      if (areaMap[filter]) area1.push(areaMap[filter]);
      if (gbnMap[filter]) gbn.push(gbnMap[filter]);
    });

    return {
      area1: area1.join(',') || null,
      gbn: gbn.join(',') || null,
    };
  };

  // 관심 목록에 저장하기 (이미 저장된 교육인지 확인 후에 저장)
  const handleSave = async (training) => {
    try {
      const savedRes = await api.get(
        '/api/mypage/saved-educations?userId=1&expand=ids'
      );
      const savedIdList = savedRes.data || [];
      const alreadySaved = savedIdList.includes(training.id);

      if (alreadySaved) {
        console.log('✅ 이미 저장된 교육', training.id);
        setModalMessage('이미 저장된 교육입니다.');
      } else {
        await api.post('/api/educations/save', {
          userId: 1,
          educationId: training.id,
        });
        console.log('✅ 관심 목록 저장 성공', training.id);
        setModalMessage('저장이 완료되었습니다!');
      }

      setShowModal(true);
    } catch (err) {
      console.error('❌ 관심 목록 저장 실패', err);
      alert('관심 목록 저장에 실패했습니다. 잠시 후 다시 시도해주세요.');
    }
  };

  // 저장 모달 닫기 핸들러
  const handleCloseModal = () => {
    setShowModal(false);
  };

  // 로딩 화면
  if (loading) {
    return (
      <div className="pg">
        <div className="text-center py-8">
          <div className="text-4xl mb-4">⏳</div>
          <p>교육 목록을 불러오는 중...</p>
        </div>
      </div>
    );
  }

  // 검색
  const filteredTrainings = trainings.filter(
    (training) =>
      training.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      training.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="pg">
      <div className="title-box">
        <header className="title-header">
          <button
            className="back-btn"
            aria-label="뒤로"
            onClick={() => onNavigate?.("home")}
            type="button"
          >
            <svg
              viewBox="0 0 24 24"
              width="22"
              height="22"
              fill="none"
              stroke="#111"
              strokeWidth="2.5"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <div className="hdr-right" />
        </header>

        <p className="title-text">교육 프로그램</p>
        <div className="search-items">
          <input
            type="text"
            placeholder="궁금하신 걸 검색해주세요"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="search-bar"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                setSearchTerm(searchInput);
              }
            }}
          />
          <button
            className="search-btn"
            onClick={() => setSearchTerm(searchInput)}
          >
            검색
          </button>
        </div>

        {/* 상세조건 */}
        <div>
          <div className="ft-box">
            <p className={`ft-text ${showDropdown ? 'ft-text-on' : ''}`}>
              상세조건을 선택하세요
            </p>
            <button
              className={`ft-btn ${showDropdown ? 'ft-btn-on' : ''}`}
              onClick={() => {
                setShowDropdown((prev) => !prev);
              }}
            ></button>
          </div>

          {showDropdown && (
            <div className="ft-dropdown-box">
              <div
                className="ft-dropdown"
                onClick={() => handleFilterSelect('지역')}
              >
                지역
              </div>
              <div
                className="ft-dropdown"
                onClick={() => handleFilterSelect('훈련')}
              >
                훈련
              </div>
            </div>
          )}

          {/* 선택된 조건 표시 */}
          {appliedFilter && appliedFilter.length > 0 && (
            <div className="applied-filter-box space-y-3">
              <p className="applied-filter-text">선택한 조건</p>
              {appliedFilter.map((item) => (
                <div key={item} className="applied-filter">
                  {item}
                  <button
                    className="close-btn"
                    onClick={() => handleRemoveAppliedFilter(item)}
                  ></button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="len-latest-box">
        <p className="ft-len-text">전체 {filteredTrainings.length}개</p>
      </div>

      <div>
        {filteredTrainings.length === 0 ? (
          <div className="text-center py-8">
            <p className="sm-title">선택한 조건이나 검색어에 맞는</p>
            <p className="sm-title">교육 프로그램이 없습니다.</p>
            <button
              className="btn-list"
              onClick={() => {
                setAppliedFilter([]);
                setSearchTerm('');
                setSearchInput('');
                setTempChecked([]);
                setShowDropdown(false);
              }}
            >
              전체 교육 목록 보기
            </button>
          </div>
        ) : (
          filteredTrainings.map((training) => (
            <div key={training.id} className="list-card">
              <div>
                <div className="card-text-t">
                  <p className="card-title-t">{training.title}</p>

                  <div className="condition-box-t">
                    <div className="condition-line-t">
                      <img
                        className="condition-icon-t"
                        src="/icon/calendar-icon.svg"
                      />
                      <p className="condition-text-t">
                        시작일: {training.startDate}
                      </p>
                    </div>

                    <div className="condition-line-t">
                      <img
                        className="condition-icon-t"
                        src="/icon/calendar-icon.svg"
                      />
                      <p className="condition-text-t">
                        종료일: {training.endDate}
                      </p>
                    </div>

                    <div className="condition-line-t">
                      <img
                        className="condition-icon-t"
                        src="/icon/location-icon.svg"
                      />
                      <p className="condition-text-t">{training.address}</p>
                    </div>
                    <div className="condition-line-t">
                      <img
                        className="condition-icon-t"
                        src="/icon/user-icon.svg"
                      />
                      <p className="condition-text-t">{training.trainTarget}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="btn-box">
                <button
                  className="btn-one"
                  onClick={() => handleSave(training)}
                >
                  저장하기
                </button>
                <button
                  className="btn-two"
                  onClick={() =>
                    onNavigate &&
                    onNavigate(SCREENS.TRAINING_DETAIL, training.id)
                  }
                >
                  상세보기
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {showModal && (
        <Modal
          onNavigate={onNavigate}
          onClose={handleCloseModal}
          message={modalMessage}
        />
      )}

      {showFilterModal && (
        <div className="ft-modal-backdrop">
          <div className="ft-modal-box" onClick={(e) => e.stopPropagation()}>
            <p className="ft-modal-text1">{selectedFilter}을 선택해주세요</p>
            <div>
              {filterOptions.map((option) => (
                <p className="ft-modal-text2 mb-2" key={option}>
                  <label className="checkbox">
                    <input
                      type="checkbox"
                      checked={tempChecked.includes(option)}
                      onChange={() => handleTempCheck(option)}
                    />{' '}
                    {option}
                  </label>
                </p>
              ))}
            </div>

            <div className="modal-btn-box">
              <button onClick={handleApplyFilter} className="ft-modal-btn1">
                적용
              </button>
              <button
                onClick={() => setShowFilterModal(false)}
                className="ft-modal-btn2"
              >
                취소
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
