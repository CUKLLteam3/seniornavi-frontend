// 지원 및 즐겨찾기 핸들러 생성
export const createApplicationHandlers = (
  applications,
  setApplications,
  favorites,
  setFavorites,
  setApplicationModal
) => {
  
  // 지원하기 처리
  const handleApply = (item) => {
    console.log('지원하기:', item);
    
    const newApplication = {
      id: Date.now().toString(),
      type: item.type || 'job',
      itemId: item.id,
      title: item.title,
      company: item.company,
      appliedDate: new Date().toLocaleDateString('ko-KR'),
      status: 'pending'
    };
    
    setApplications(prev => [newApplication, ...prev]);
    
    // 지원 완료 모달 표시
    if (setApplicationModal) {
      setApplicationModal({
        isOpen: true,
        type: 'job-application',
        title: item.title,
        company: item.company
      });
    }
  };
  
  // 즐겨찾기 토글
  const handleToggleFavorite = (item) => {
    console.log('즐겨찾기 토글:', item);
    
    const existingFavorite = favorites.find(fav => fav.itemId === item.id);
    
    if (existingFavorite) {
      // 즐겨찾기 제거
      setFavorites(prev => prev.filter(fav => fav.itemId !== item.id));
    } else {
      // 즐겨찾기 추가
      const newFavorite = {
        id: Date.now().toString(),
        type: item.type || 'job',
        itemId: item.id,
        title: item.title,
        company: item.company,
        addedDate: new Date().toLocaleDateString('ko-KR')
      };
      setFavorites(prev => [newFavorite, ...prev]);
    }
  };
  
  // 즐겨찾기 여부 확인
  const isFavorite = (itemId) => {
    return favorites.some(fav => fav.itemId === itemId);
  };
  
  // 지원 여부 확인
  const hasApplied = (itemId) => {
    return applications.some(app => app.itemId === itemId);
  };
  
  return {
    handleApply,
    handleToggleFavorite,
    isFavorite,
    hasApplied
  };
};