import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterModalComponent } from './filter-modal.component';
import { Filter } from 'src/app/shared/models/filter.modal';

describe('FilterModalComponent', () => {
    let component: FilterModalComponent;
    let fixture: ComponentFixture<FilterModalComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [FilterModalComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(FilterModalComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should call "closeModal" correctly', () => {
        const mockApliedFilters: Filter[] = [{ id: 1, selected: true }];

        component.appliedFilters = mockApliedFilters;

        spyOn(component, "setFilterCount").and.callThrough();
        spyOn(component.modalClose, "emit")

        component.closeModal();

        expect(component.filters).toEqual(mockApliedFilters);
        expect(component.setFilterCount).toHaveBeenCalled();
        expect(component.isModalOpen).toBe(false);
        expect(component.modalClose.emit).toHaveBeenCalledWith(true);
    })

    it('should call "onFilter" correctly', ()=> {
        const mockFilters: Filter[] = [{ id: 1, selected: true }];

        component.filters = mockFilters;

        spyOn(component, 'onFilterInputsChange').and.returnValue(mockFilters);
        spyOn(component.filtersSelected, 'emit');
        spyOn(component, 'closeModal');

        component.onFilter();

        expect(component.onFilterInputsChange).toHaveBeenCalled();
        expect(component.appliedFilters).toEqual(mockFilters);
        expect(component.filtersSelected.emit).toHaveBeenCalledWith(mockFilters);
        expect(component.closeModal).toHaveBeenCalled();
    })

    it('should call "onFilterInputsChange" correctly', ()=> {
        const mockFilters: Filter[] = [{ id: 1, selected: true }, { id: 2, selected: false }];
        const mockResult : Filter[] =[{ id: 1, selected: true }]

        component.filters = mockFilters;

        component.onFilterInputsChange();

        expect(component.filterCount).toEqual(mockResult.length);
        expect(component.onFilterInputsChange()).toEqual(mockResult);
    })

    it('should set filters.selected to false', ()=> { 
        component.filters = [{ id: 1, selected: false }, { id: 2, selected: false }];

        spyOn(component, 'onFilter');
        component.clearFilters();

        expect(component.filters[0].selected).toBe(false);
        expect(component.filters[0].selected).toBe(false);
        expect(component.onFilter).toHaveBeenCalled();
    })
});
