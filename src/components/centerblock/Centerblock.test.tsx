import { ContentTitle } from "./Centerblock";
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import "@testing-library/jest-dom";  // Импортируем для использования метода toBeInTheDocument

describe("Centertitle component", () => {
    it("должен корректно рендериться", () => {
        render(<ContentTitle />);
        // Проверяем наличие элементов, которые должны быть на странице
        const titleTrackElement = screen.getByText(/Трек/i);
        expect(titleTrackElement).toBeInTheDocument();    
        const titleAuthorElement = screen.getByText(/Исполнитель/i);
        expect(titleAuthorElement).toBeInTheDocument(); 
        const titleAlbumElement = screen.getByText(/Альбом/i);
        expect(titleAlbumElement).toBeInTheDocument();    
    });
   });