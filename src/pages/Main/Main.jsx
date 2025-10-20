import { use, useEffect, useState } from "react";
import NewsBanner from "../../components/NewsBanner/NewsBanner";
import styles from "./styles.module.css";
import { getNews, getCategories } from "../../api/apiNews";
import NewsList from "../../components/NewsList/NewsList";
import Skeleton from "../../components/Skeleton/Skeleton";
import Categories from "../../components/Categories/Categories";
import { Pagination as MuiPagination, Stack } from "@mui/material";

const Main = () => {
    const [news, setNews] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("All");
    const totalPages = 10;
    const pageSize = 10;

    const fetchNews = async (currentPage) => {
        try {
            setIsLoading(true);
            const response = await getNews({
                page_number: currentPage,
                page_size: pageSize,
                category: selectedCategory === "All" ? null : selectedCategory,
            });
            setNews(response.news);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    const fetchCategories = async () => {
        try {
            const response = await getCategories();
            setCategories(["All", ...response.categories]);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    useEffect(() => {
        fetchNews(currentPage);
    }, [currentPage, selectedCategory]);

    const handleChangePage = (_evt, page) => setCurrentPage(page);

    return (
        <>
            <main className={styles.main}>
                <Categories
                    categories={categories}
                    setSelectedCategory={setSelectedCategory}
                    selectedCategory={selectedCategory} 
                />
                {news.length > 0 && !isLoading ? (
                    <NewsBanner item={news[0]} />
                ) : (
                    <Skeleton type="banner" count={1} />
                )}

                <Stack alignItems="center" sx={{ my: 2 }}>
                    <MuiPagination
                        count={totalPages}
                        page={currentPage}
                        onChange={handleChangePage}
                        disabled={isLoading}
                        shape="rounded"
                        color="primary"
                        siblingCount={1}
                        boundaryCount={1}
                    />
                </Stack>

                {!isLoading ? (
                    <NewsList news={news} />
                ) : (
                    <Skeleton type="item" count={10} />
                )}

                <Stack alignItems="center" sx={{ my: 2 }}>
                    <MuiPagination
                        count={totalPages}
                        page={currentPage}
                        onChange={handleChangePage}
                        disabled={isLoading}
                        shape="rounded"
                        color="primary"
                        siblingCount={1}
                        boundaryCount={1}
                    />
                </Stack>
            </main>
        </>
    );
};

export default Main;