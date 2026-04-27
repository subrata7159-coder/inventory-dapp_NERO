// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract Inventory {
    struct Product {
        string id;
        address owner;
        string name;
        string sku;
        uint256 quantity;
        uint256 unitPrice;
        string category;
        bool isActive;
    }

    mapping(string => Product) public products;
    string[] public productIds;

    event ProductAdded(string id, address owner, string name);
    event StockUpdated(string id, uint256 newQuantity);
    event PriceUpdated(string id, uint256 newPrice);
    event ProductDiscontinued(string id);

    modifier onlyOwner(string memory _id) {
        require(products[_id].owner == msg.sender, "Not product owner");
        _;
    }

    function addProduct(
        string memory _id,
        string memory _name,
        string memory _sku,
        uint256 _quantity,
        uint256 _unitPrice,
        string memory _category
    ) public {
        require(products[_id].owner == address(0), "Product already exists");

        products[_id] = Product({
            id: _id,
            owner: msg.sender,
            name: _name,
            sku: _sku,
            quantity: _quantity,
            unitPrice: _unitPrice,
            category: _category,
            isActive: true
        });

        productIds.push(_id);

        emit ProductAdded(_id, msg.sender, _name);
    }

    function updateStock(string memory _id, uint256 _quantityChange, bool _isAddition) public onlyOwner(_id) {
        require(products[_id].isActive, "Product is discontinued");
        if (_isAddition) {
            products[_id].quantity += _quantityChange;
        } else {
            require(products[_id].quantity >= _quantityChange, "Insufficient stock");
            products[_id].quantity -= _quantityChange;
        }
        emit StockUpdated(_id, products[_id].quantity);
    }

    function updatePrice(string memory _id, uint256 _newPrice) public onlyOwner(_id) {
        require(products[_id].isActive, "Product is discontinued");
        products[_id].unitPrice = _newPrice;
        emit PriceUpdated(_id, _newPrice);
    }

    function discontinueProduct(string memory _id) public onlyOwner(_id) {
        products[_id].isActive = false;
        emit ProductDiscontinued(_id);
    }

    function getProduct(string memory _id) public view returns (Product memory) {
        require(products[_id].owner != address(0), "Product not found");
        return products[_id];
    }

    function listProducts() public view returns (Product[] memory) {
        Product[] memory allProducts = new Product[](productIds.length);
        for (uint256 i = 0; i < productIds.length; i++) {
            allProducts[i] = products[productIds[i]];
        }
        return allProducts;
    }

    function getLowStock(uint256 _threshold) public view returns (Product[] memory) {
        uint256 count = 0;
        for (uint256 i = 0; i < productIds.length; i++) {
            if (products[productIds[i]].quantity < _threshold && products[productIds[i]].isActive) {
                count++;
            }
        }

        Product[] memory lowStock = new Product[](count);
        uint256 index = 0;
        for (uint256 i = 0; i < productIds.length; i++) {
            if (products[productIds[i]].quantity < _threshold && products[productIds[i]].isActive) {
                lowStock[index] = products[productIds[i]];
                index++;
            }
        }
        return lowStock;
    }

    function getTotalValue() public view returns (uint256) {
        uint256 totalValue = 0;
        for (uint256 i = 0; i < productIds.length; i++) {
            if (products[productIds[i]].isActive) {
                totalValue += products[productIds[i]].quantity * products[productIds[i]].unitPrice;
            }
        }
        return totalValue;
    }
}
