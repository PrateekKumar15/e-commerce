import { Link } from "react-router-dom";

const CategoryItem = ({ category }) => {
	return (
		<div className='relative overflow-hidden h-96 w-full rounded-lg group bg-card dark:bg-dark-card shadow-lg border border-border/50 dark:border-dark-border/50 transition-all duration-500 hover:shadow-xl hover:border-primary/30 dark:hover:border-primary/30'>
			<Link to={"/category" + category.href}>
				<div className='w-full h-full cursor-pointer'>
					<div className='absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-dark-card/80 opacity-70 z-10 transition-opacity duration-300 group-hover:opacity-60' />
					<div className="w-full h-full overflow-hidden">
						<img
							src={category.imageUrl}
							alt={category.name}
							className='w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 group-hover:rotate-1'
							loading='lazy'
						/>
					</div>
					<div className='absolute bottom-0 left-0 right-0 p-6 z-20 transform transition-transform duration-300 group-hover:translate-y-[-5px]'>
						<h3 className='text-primary-foreground text-3xl font-bold mb-3 text-shadow-sm'>{category.name}</h3>
						<p className='text-primary-foreground/90 text-sm font-medium bg-primary/70 dark:bg-primary/80 inline-block px-3 py-1 rounded-full transition-all duration-300 group-hover:bg-primary'>
							Explore {category.name}
						</p>
					</div>
				</div>
			</Link>
		</div>
	);
};

export default CategoryItem;