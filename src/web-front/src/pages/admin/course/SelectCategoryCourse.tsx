import { Select, SelectItem } from '@nextui-org/react';
import { TbSelector } from 'react-icons/tb';
import { MdCategory } from 'react-icons/md';
import { ICategoryCourse } from '../../../model/Common.model';
import { useEffect, useState } from 'react';

export type ICategory = {
    id: any;
    nameCategory: string;
};

// type SelectCategoryCourseProps = {
//     onResult: (res: any,category: ICategoryCourse|null) => void;
//     value?: ICategoryCourse;
// };

type SelectCategoryCourseProps = {
    onResult: (res: any) => void;
    value?: any;
};

const getAllCategoryCourse = async (): Promise<ICategoryCourse[] | null> => {
    try {
        const response = await fetch(import.meta.env.VITE_URL_API+'category-course', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const responseData: ICategoryCourse[] = await response.json();
        return responseData;
    } catch (error) {
        console.error('Error during registration:', error);
        return null;
    }
};

function SelectCategoryCourse(props: SelectCategoryCourseProps) {
    const [categories, setCategories] = useState<ICategoryCourse[]>([]);

    useEffect(() => {
        const getData = async () => {
            const res = await getAllCategoryCourse();
            if (res) {
                const filteredCategories = res.filter((category) => !category.isLock);
                setCategories(filteredCategories); // Set the filtered categories
            }
        };
        getData();
    }, []);

    // console.log(categories[0]);
    return (
        // <Select
        //     onChange={(val) => {
        //         const selectedCategory = categories.find((category) => category.id?.toString() === val.target.value) || null; // Find selected category
        //         props.onResult(+val.target.value === 0 ? null : +val.target.value,selectedCategory||null)
        //     }}
        //     startContent={<MdCategory className="text-xl" />}
        //     labelPlacement="outside"
        //     disableSelectorIconRotation
        //     placeholder="Chọn"
        //     label="Khóa học thuộc danh mục nào"
        //     className="max-w-[20rem]"
        //     selectorIcon={<TbSelector className="text-xl" />}
        //     selectedKeys={props.value?.id ? [props.value.id.toString()] : []}
        // >
        //     {categories.map((category: ICategoryCourse, index: number) => (
        //         <SelectItem key={category?.id ?? index} value={category.id} variant="flat" color="secondary">
        //             {category.categoryName}
        //         </SelectItem>
        //     ))}
        // </Select>
        <Select
            onChange={(val) => {
                props.onResult(+val.target.value === 0 ? null : +val.target.value);
            }}
            startContent={<MdCategory className="text-xl" />}
            labelPlacement="outside"
            disableSelectorIconRotation
            placeholder="Chọn"
            label="Khóa học thuộc danh mục nào"
            className="max-w-[20rem]"
            selectorIcon={<TbSelector className="text-xl" />}
            selectedKeys={props.value ? [props.value.toString()] : []}
        >
            {categories.map((category: ICategoryCourse, index: number) => (
                <SelectItem key={category?.id ?? index} value={category.id} variant="flat" color="secondary">
                    {category.categoryName}
                </SelectItem>
            ))}
        </Select>
    );
}

export default SelectCategoryCourse;
