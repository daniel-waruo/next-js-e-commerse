import React from 'react';
import Link from 'next/link'

const style = (
  <style>
    {`
      .nav-menu li{
        list-style:none;
        border-bottom:solid #efefef 1px;
        border-top:solid #efefef 1px;
      }
      .nav-menu li:hover{
        background-color: #efefef
      }
      .nav-menu li a{
        color:black;
      }
      .nav-menu li a:hover{
        color:grey;
      }
    `}
  </style>
);

class CategoryMenuLinks extends React.PureComponent {

  render() {
    // get the category objects passed in the props
    let categories = this.props.categories,
      //create a menu links for every object in categoryLinks
      categoryLinks = categories.map(
        (category, index) => {
          const link = `/products/${category.slug}`;
          return (
            <li key={index}>
              <Link href={"/products/[category]"} as={link}>
                <a className={"w-100"}>
                  <div className={"w-100 py-3"}>
                    <span className={"pl-5"}>{category.name}</span>
                  </div>
                </a>
              </Link>
            </li>
          )
        }
      );
    // get the fixed height the category link if none display not considering overflow
    let heightClass = this.props.heightClass,
      listClasses = "list-unstyled example-components-list";
    if (heightClass)
      listClasses += listClasses + heightClass + "overflow-auto";
    return (
      <div className={"grey-text text-uppercase " + this.props.className}>
        {style}
        <h3 className={"grey-text text-center text-bold py-2"}>CATEGORIES</h3>
        <nav>
          <ul className={"nav-menu p-0"}>
            {categoryLinks}
          </ul>
        </nav>
      </div>
    )
  }
}

export default CategoryMenuLinks;
