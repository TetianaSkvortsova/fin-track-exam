import {StyledToggleButton, StyledToggleButtonGroup} from "./CategoryTypeToggleButtons.styled.ts";
import {useCategoryTypeToggleButtonsLogic} from "../../hooks/useCategoryTypeToggleButtonsLogic.ts";


function CategoryTypeToggleButtons() {
    const {
        currentCategoryType,
        categories,
        handleChange,
    } = useCategoryTypeToggleButtonsLogic();

    return (
        <div className="category-header">
            <StyledToggleButtonGroup
                color="standard"
                value={currentCategoryType?.id || categories[0]?.id}
                exclusive
                onChange={handleChange}
                aria-label="Categories Type"
            >
                {
                    categories.map((category) => {
                        return <StyledToggleButton
                            value={category.id}
                        >
                            {category.caption}
                        </StyledToggleButton>
                    })
                }
            </StyledToggleButtonGroup>
        </div>
    );
}

export default CategoryTypeToggleButtons;