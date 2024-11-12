# Function Chain Calculator

This React application is a visual and interactive function chain calculator where users can enter up to five mathematical expressions (functions) that are evaluated sequentially, resulting in a final output.

## Features

- **Equation Input**: Enter mathematical expressions for each function card using "x" as the variable.
- **Function Chaining**: Calculations are performed sequentially from the initial value through each equation, with the output of one function serving as the input for the next.
- **Error Handling**: Validates inputs and displays error messages if invalid characters or equations are entered.
- **Dynamic Output Visualization**: View intermediate results on each function card as calculations proceed through the chain.
- **SVG Connectors**: Visual connections between function cards show the flow of values, using straight, curved, or offset lines.

## Screenshots

<img width="1438" alt="image" src="https://github.com/user-attachments/assets/eacb8199-716f-4363-b011-654db8df5893">


## Usage

1. **Set Initial Value**: Enter the starting value of `x` in the input field.
2. **Define Functions**: Each function card accepts an equation in terms of `x`. Enter valid mathematical expressions using `x` (e.g., `x**2`, `2*x + 4`, etc.).
3. **View Outputs**: The output of each function is displayed on its respective card.
4. **Connectors**: SVG connectors visually represent the data flow between function cards.

## File Structure
```plaintext
├── public/
│   └── index.html               # Root HTML file
├── src/
│   ├── components/
│   │   ├── FunctionCard.tsx     # Function card component for each equation
│   │   ├── Connector.tsx        # SVG connector component
│   │   └── GridIcon.tsx         # Icon used within FunctionCard
│   ├── App.tsx                  # Main app entry point
│   ├── FunctionChain.tsx        # Main function chain component
│   ├── index.tsx                # App rendering and setup
│   └── styles/
│       └── globals.css          # Global styles and Tailwind CSS configuration
├── .gitignore                   # Ignored files and directories
├── package.json                 # Project dependencies and scripts
├── README.md                    # Project documentation
└── tsconfig.json                # TypeScript configuration
```

## Dependencies

- **React**: UI Library.
- **TypeScript**: For static type checking.
- **CSS/Styling**: Tailwind CSS and custom styling.

## Future Improvements

- Allow users to add or remove function cards dynamically.
- Provide more advanced validation for mathematical expressions.
- Include more customization options for the SVG connectors.
