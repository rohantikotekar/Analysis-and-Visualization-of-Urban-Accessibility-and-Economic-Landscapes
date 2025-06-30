<h1> Analysis and Visualization of Urban Accessibility and Economic Landscapes  </h1>

## Overview
This project focuses on visualizing urban accessibility and socioeconomic patterns using big data techniques and geospatial visualization tools. It leverages PySpark for data processing and integrates D3.js & Leaflet.js for creating interactive maps.

Demonstration Video: https://drive.google.com/file/d/1Lg-4WDPNO8--S8iq_jmFuns-2tvQFDiK/view?usp=sharing

---

## To run BackEnd Folder

### Folder Contents
- California-UCRStar.ipynb contains the script which processes the big data concepts using pyspark
- Input-Datasets folder which contains the original files taken from UCR Star and from [Kaggle](https://www.kaggle.com/datasets/cathetorres/geospatial-environmental-and-socioeconomic-data/data)
- Input-Datasets/cleaned folder which contains the cleaned datasets that is used in this project
- Output-Datasets folder where the merged datasets are written


### How to Run the Jupyter Notebook File (`.ipynb`)

### Step 1: Install Dependencies
Ensure all required Python packages are installed. Use the provided `requirements.txt` file to set up the environment.

```bash
pip install -r requirements.txt
```
### Install Apache Spark 
Download and install Apache Spark from the official website:
[Apache Spark Download](https://spark.apache.org/downloads.html)

### Windows User - Hadoop Winutils Setup and hadoop.dll
To run Spark on Windows, you'll need winutils.exe and hadoop.dll. Download the required version of winutils.exe from the following repository: [Winutils for Hadoop 3.2.0](https://github.com/cdarlint/winutils)

Place the downloaded file in a directory (e.g., C:\hadoop\bin) and set the environment variables accordingly.

### Install PySpark
Follow the instructions for installing PySpark based on your operating system:

For Windows Users: [Watch Installation Guide](https://www.youtube.com/watch?v=rYY0LFdmI8s)

For Linux Users: [Watch Installation Guide](https://www.youtube.com/watch?v=ei_d4v9c2iA)

### Running this Project
- Make sure all the dependencies are installed. Open the Jupyter Notebook in your IDE or Jupyter environment and run-all cells.
- Place the dataset from the drive link into Datasets/Input-Datasets folder

### Note
Make sure there's 20 GB space in the storage

## To run FrontEnd Folder

### Interactive Map Project
This project displays an interactive map using Leaflet.js, showcasing various geographical features like roads, buildings, airports, ports, population, and Gowalla data. Custom icons and a legend enhance the map's visualization.

### Features 
- Displays different layers for roads, buildings, Stanford-Gowalla, airports, ports, population data.
- Custom icons for specific features like airports and ports.
- A dynamic legend that visually represents each layer.

### Prerequisites
To run this project, ensure you have the following installed:
- A web browser (e.g., Chrome, Firefox, Edge).
- A local web server (e.g., Python's HTTP server, Node.js, or any other static file server).

### Files
- index.html: Main HTML file containing the structure of the project.
- style.css: CSS file for custom styling.
- script.js: JavaScript file containing the visualization code.
- fixed_dataset.json: JSON file containing the dataset for the map.
- airport.svg, seaport.svg, population1.svg, population2.svg, population3.svg, population4.svg: Icon files for visualizing specific features.

### Installation

1. Install the required node modules.
```bash
npm init -y
npm install
```

2. Navigate to the project directory:
```bash
cd 
```

3. Make sure all the required files are in the same directory

4. Install the http-server package if not already installed:
```bash
npm install -g http-server
```

### Run the project
To run the project, you'll need to host it using a local http server.

- Using Node.js
Start the server in the project directory
```bash
http-server
```
- Using Live server extension from VS Code  

3. Open a web browser and navigate to the provided URL (default is usually http://127.0.0.1:8080).

### Troubleshooting
If you encounter any issues:
- Ensure the JSON file (fixed_dataset.json) is correctly formatted.
- Verify that all referenced files (e.g., icons) exist in the project directory.
- Check the browser console for error messages and resolve any issues.

## Acknowledgements
- [Leaflet.js](https://leafletjs.com/) for providing an excellent mapping library.
- [D3.js](https://d3js.org/)
- [OpenStreetMap](https://www.openstreetmap.org/) for the map tiles.
- [Apache Spark](https://spark.apache.org/)
- [PySpark](https://spark.apache.org/docs/latest/api/python/index.html)
- [Python](https://www.python.org/doc/)
