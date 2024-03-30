import { Daum } from "../types/search-results";

export function useUtilData() {
    const parseIncomingData = (data: Daum[]) => {
        try {
            if (data) {
                data.forEach(el => {
                    if (el.relationships) {
                        const coveArtElement = el.relationships.find(el2 => el2.type === 'cover_art');
                        if (coveArtElement) {
                            el.coverImgURL = `${process.env.REACT_APP_IMAGE_URL}${el.id}/${coveArtElement.attributes?.fileName}.256.jpg`;
                        }
                    }
                });
            }
        
            return data;
          } catch (error) {
            console.error('Error parsing data:', error);
            return null;
          }
    }

    return {parseIncomingData};
}