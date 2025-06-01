-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 01, 2025 at 01:46 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `quiz_app`
--

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `category_id` int(4) NOT NULL,
  `category_name` varchar(30) NOT NULL,
  `instructor_username` varchar(30) NOT NULL,
  `description` varchar(200) DEFAULT NULL,
  `img_url` varchar(900) NOT NULL,
  `date_created` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`category_id`, `category_name`, `instructor_username`, `description`, `img_url`, `date_created`) VALUES
(2, 'Science', 'joe', 'Explore scientific knowledge', 'https://www.shutterstock.com/shutterstock/photos/2499118483/display_1500/stock-photo-medical-research-and-scientist-in-laboratory-with-microscope-observation-and-experiment-for-study-2499118483.jpg', '2025-05-23 12:00:00'),
(3, 'History', 'ms_williams', 'Discover historical facts', 'https://www.shutterstock.com/shutterstock/photos/2502428663/display_1500/stock-photo-old-globe-lying-on-an-open-book-in-a-library-conceptual-background-on-history-education-2502428663.jpg', '2025-05-23 12:00:00'),
(4, 'Computer Science', 'joe', 'Computer Science', 'https://www.shutterstock.com/shutterstock/photos/2284126663/display_1500/stock-photo-data-science-and-big-data-technology-scientist-computing-analysing-and-visualizing-complex-data-2284126663.jpg', '2025-05-23 12:00:00'),
(6, 'Engineering', 'joe', 'Engineering', 'https://www.shutterstock.com/shutterstock/photos/2184125681/display_1500/stock-photo-mechanic-using-wrench-while-working-on-car-engine-at-garage-workshop-car-auto-services-and-2184125681.jpg', '2025-05-23 12:00:00'),
(7, 'Robotics', 'joe', 'Robotics', 'https://www.shutterstock.com/shutterstock/photos/2476186489/display_1500/stock-photo-row-of-white-robotic-arms-at-modern-factory-lithium-ion-ev-battery-pack-production-at-automated-2476186489.jpg', '2025-05-24 11:55:04');

-- --------------------------------------------------------

--
-- Table structure for table `instructors`
--

CREATE TABLE `instructors` (
  `username` varchar(30) NOT NULL,
  `password` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `instructors`
--

INSERT INTO `instructors` (`username`, `password`) VALUES
('joe', '66'),
('ms_williams', 'quiz789'),
('prof_smith', 'teach123');

-- --------------------------------------------------------

--
-- Table structure for table `questions`
--

CREATE TABLE `questions` (
  `question_id` int(10) NOT NULL,
  `question` varchar(200) NOT NULL,
  `quiz_id` int(30) NOT NULL,
  `option_1` varchar(1000) NOT NULL,
  `option_2` varchar(1000) NOT NULL,
  `option_3` varchar(1000) NOT NULL,
  `option_4` varchar(1000) NOT NULL,
  `correct_option` varchar(1000) NOT NULL,
  `username` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `questions`
--

INSERT INTO `questions` (`question_id`, `question`, `quiz_id`, `option_1`, `option_2`, `option_3`, `option_4`, `correct_option`, `username`) VALUES
(42, 'When did World War I begin?', 71, '1912', '1914', '1916', '1918', '1914', 'joe'),
(43, 'Who was the first President of the United States?', 71, 'Thomas Jefferson', 'John Adams', 'George Washington', 'Abraham Lincoln', 'George Washington', 'joe'),
(44, 'Which ancient civilization built the pyramids of Giza?', 71, 'Greeks', 'Romans', 'Egyptians', 'Mesopotamians', 'Egyptians', 'joe'),
(45, 'The French Revolution began in which year?', 71, '1776', '1789', '1799', '1804', '1789', 'joe'),
(46, 'Who wrote the Declaration of Independence?', 71, 'Benjamin Franklin', 'Thomas Jefferson', 'John Hancock', 'James Madison', 'Thomas Jefferson', 'joe'),
(47, 'Which empire was ruled by Julius Caesar?', 71, 'Greek Empire', 'Roman Empire', 'Ottoman Empire', 'British Empire', 'Roman Empire', 'joe'),
(48, 'The Industrial Revolution started in which country?', 71, 'France', 'Germany', 'United States', 'Great Britain', 'Great Britain', 'joe'),
(49, 'Who was the leader of the Soviet Union during World War II?', 71, 'Vladimir Lenin', 'Joseph Stalin', 'Nikita Khrushchev', 'Leon Trotsky', 'Joseph Stalin', 'joe'),
(50, 'The Berlin Wall fell in which year, symbolizing the end of the Cold War?', 71, '1985', '1989', '1991', '1995', '1989', 'joe'),
(51, 'Which explorer is credited with discovering America in 1492?', 71, 'Vasco da Gama', 'Ferdinand Magellan', 'Christopher Columbus', 'Marco Polo', 'Christopher Columbus', 'joe'),
(52, 'Which ancient wonder was located in Babylon?', 72, 'Great Pyramid of Giza', 'Hanging Gardens', 'Colossus of Rhodes', 'Lighthouse of Alexandria', 'Hanging Gardens', 'joe'),
(53, 'Who was the first female pharaoh of Egypt?', 72, 'Cleopatra', 'Nefertiti', 'Hatshepsut', 'Sobekneferu', 'Hatshepsut', 'joe'),
(54, 'The Magna Carta was signed in which year?', 72, '1066', '1215', '1492', '1776', '1215', 'joe'),
(55, 'Which empire was known for its advanced road system, including the famous \"Inca Roads\"?', 72, 'Aztec Empire', 'Inca Empire', 'Maya Civilization', 'Roman Empire', 'Inca Empire', 'joe'),
(56, 'The Renaissance began in which country?', 72, 'France', 'Italy', 'Spain', 'Germany', 'Italy', 'joe'),
(57, 'Who was the first emperor of China?', 72, 'Confucius', 'Qin Shi Huang', 'Genghis Khan', 'Emperor Wu', 'Qin Shi Huang', 'joe'),
(58, 'The Battle of Hastings (1066) was fought between which two sides?', 72, 'England vs. France', 'Normans vs. Anglo-Saxons', 'Vikings vs. Saxons', 'Romans vs. Celts', 'Normans vs. Anglo-Saxons', 'joe'),
(59, 'Which treaty ended World War I?', 72, 'Treaty of Versailles', 'Treaty of Paris', 'Treaty of Tordesillas', 'Treaty of Vienna', 'Treaty of Versailles', 'joe'),
(60, 'Who was the leader of the Indian independence movement against British rule?', 72, 'Jawaharlal Nehru', 'Subhas Chandra Bose', 'Mahatma Gandhi', 'Bhagat Singh', 'Mahatma Gandhi', 'joe'),
(61, 'The Cold War was primarily a conflict between which two superpowers?', 72, 'USA & China', 'USA & Soviet Union', 'Britain & France', 'Germany & Russia', 'USA & Soviet Union', 'joe'),
(62, 'Which empire was known as the \"Empire on which the sun never sets\"?', 73, 'Mongol Empire', 'Ottoman Empire', 'British Empire', 'Roman Empire', 'British Empire', 'joe'),
(63, 'The Ming Dynasty ruled which country?', 73, 'Japan', 'India', 'China', 'Persia', 'China', 'joe'),
(64, 'Who founded the Mongol Empire?', 73, 'Kublai Khan', 'Attila the Hun', 'Genghis Khan', 'Timur', 'Genghis Khan', 'joe'),
(65, 'The Byzantine Empire was a continuation of which ancient empire?', 73, 'Persian Empire', 'Roman Empire', 'Egyptian Empire', 'Greek Empire', 'Roman Empire', 'joe'),
(66, 'Which dynasty ruled France during the French Revolution?', 73, 'Tudor', 'Bourbon', 'Habsburg', 'Romanov', 'Bourbon', 'joe'),
(67, 'The Maurya Empire was a major power in ancient:', 73, 'China', 'Persia', 'India', 'Mesopotamia', 'India', 'joe'),
(68, 'Which African empire was famous for its wealth in gold and salt trade?', 73, 'Zulu Kingdom', 'Mali Empire', 'Songhai Empire', 'Axumite Empire', 'Mali Empire', 'joe'),
(69, 'The Habsburg Dynasty was prominent in which region?', 73, 'Middle East', 'Eastern Europe', 'Southeast Asia', 'South America', 'Eastern Europe', 'joe'),
(70, 'Who was the longest-reigning female pharaoh of Egypt?', 73, 'Nefertiti', 'Cleopatra', 'Hatshepsut', 'Sobekneferu', 'Hatshepsut', 'joe'),
(71, 'The Tokugawa shogunate ruled which country for over 250 years?', 73, 'Korea', 'Vietnam', 'Japan', 'Thailand', 'Japan', 'joe'),
(72, 'What is the chemical symbol for gold?', 74, 'Ag', 'Au', 'Pb', 'Fe', 'Au', 'joe'),
(73, 'Which planet is known as the \"Red Planet\"?', 74, 'Venus', 'Mars', 'Jupiter', 'Saturn', 'Mars', 'joe'),
(74, 'What is the hardest natural substance on Earth?', 74, 'Gold', 'Iron', 'Diamond', 'Quartz', 'Diamond', 'joe'),
(75, 'Which gas do plants absorb during photosynthesis?', 74, 'Oxygen', 'Nitrogen', 'Carbon Dioxide', 'Hydrogen', 'Carbon Dioxide', 'joe'),
(76, 'What is the smallest unit of life?', 74, 'Atom', 'Molecule', 'Cell', 'Organ', 'Cell', 'joe'),
(77, ' Which scientist developed the theory of relativity?', 74, 'Isaac Newton', 'Albert Einstein', 'Galileo Galilei', 'Stephen Hawking', 'Albert Einstein', 'joe'),
(78, 'What is the main component of the Sun?', 74, 'Oxygen', 'Hydrogen', 'Helium', 'Carbon', 'Hydrogen', 'joe'),
(79, 'Which of these is NOT a type of rock?', 74, 'Igneous', 'Sedimentary', 'Metamorphic', 'Vaporious', 'Vaporious', 'joe'),
(80, 'What force keeps planets in orbit around the Sun?', 74, 'Electromagnetism', 'Gravity', 'Friction', 'Centrifugal Force', 'Gravity', 'joe'),
(81, 'What is the pH value of pure water?', 74, '5', '7', '10', '14', '7', 'joe'),
(82, ' Which organ produces insulin in the human body?', 75, 'Liver', 'Pancreas', 'Kidney', 'Stomach', 'Pancreas', 'joe'),
(83, 'What type of energy is stored in a stretched rubber band?', 75, 'Kinetic', 'Thermal', 'Elastic potential', 'Chemical', 'Elastic potential', 'joe'),
(84, 'Which element is liquid at room temperature?', 75, 'Bromine', 'Iodine', 'Silicon', 'Carbon', 'Bromine', 'joe'),
(85, 'What is the speed of light in a vacuum?', 75, '300,000 km/h', '300,000 m/s', '300,000 km/s', '3,000 km/s', '300,000 km/s', 'joe'),
(86, 'Which gas makes up 78% of Earths atmosphere?', 75, 'Oxygen', 'Carbon dioxide', 'Nitrogen', 'Argon', 'Nitrogen', 'joe'),
(87, 'What is the process by which plants lose water vapor?', 75, 'Photosynthesis', 'Transpiration', 'Respiration', 'Osmosis', 'Photosynthesis', 'joe'),
(88, 'Which planet has the most moons in our solar system?', 75, 'Jupiter', 'Saturn', 'Neptune', 'Mars', 'Saturn', 'joe'),
(89, 'What is the pH of a strong acid like hydrochloric acid?', 75, '1', '7', '10', '14', '1', 'joe'),
(90, 'Which scientist discovered penicillin?', 75, 'Marie Curie', 'Alexander Fleming', 'Louis Pasteur', 'Isaac Newton', 'Alexander Fleming', 'joe'),
(91, 'Which subatomic particle has a negative charge?', 1, 'Proton', 'Neutron', 'Electron', 'Nucleus', 'Electron', 'joe'),
(92, 'What is the pH value of pure water?', 1, '5', '7', '10', '14', '7', 'joe'),
(93, 'What force keeps planets in orbit around the Sun?', 1, 'Electromagnetism', 'Gravity', 'Friction', 'Centrifugal Force', 'Gravity', 'joe'),
(94, 'What is the main component of the Sun?', 1, 'Oxygen', 'Carbon', 'Hydrogen', 'Helium', 'Hydrogen', 'joe'),
(95, 'Which scientist developed the theory of relativity?', 1, 'saac Newton', 'Albert Einstein', 'Galileo Galilei', 'Stephen Hawking', 'Albert Einstein', 'joe'),
(96, 'What is the smallest unit of life?', 1, 'Atom', 'Molecule', 'Cell', 'Organ', 'Cell', 'joe'),
(97, 'Which gas do plants absorb during photosynthesis?', 1, 'Hydrogen', 'Carbon Dioxide', 'Nitrogen', 'Oxygen', 'Carbon Dioxide', 'joe'),
(98, 'What is the hardest natural substance on Earth?', 1, 'Gold', 'Iron', 'Diamond', 'Quartz', 'Diamond', 'joe'),
(99, 'Which planet is known as the \"Red Planet\"?', 1, 'Saturn', 'Jupiter', 'Mars', 'Venus', 'Mars', 'joe'),
(100, 'What is the chemical symbol for gold?', 1, 'Ag', 'Au', 'Pb', 'Fe', 'Au', 'joe'),
(101, 'What does CPU stand for?', 76, 'Central Processing Unit', 'Computer Processing Unit', 'Central Program Unit', 'Core Processing Unit', 'Central Processing Unit', 'joe'),
(102, 'Which of these is NOT a programming language?', 76, 'Python', 'JAVA', 'HTML', 'SQL', 'HTML', 'joe'),
(103, 'What does RAM stand for?', 76, 'Random Access Memory', 'Read-Only Memory', 'Rapid Access Memory', 'Random Allocation Memory', 'Random Access Memory', 'joe'),
(104, 'Which data structure uses FIFO (First-In-First-Out) principle?', 76, 'Stack', 'Queue', 'Array', 'Tree', 'Queue', 'joe'),
(105, 'What is the binary equivalent of decimal number 10?', 76, '1000', '1010', '1100', '1110', '1010', 'joe'),
(106, 'Which protocol is used to access websites?', 76, 'FTP', 'HTTP', 'SMTP', 'TCP', 'HTTP', 'joe'),
(107, 'What does IDE stand for in programming?', 76, 'Integrated Development Environment', 'Interface Design Element', 'Internet Data Exchange', 'Input Device Environment', 'Integrated Development Environment', 'joe'),
(108, 'Which of these is NOT a type of database?', 76, 'Relational', 'NoSQL', 'Blockchain', 'Spreadsheet', 'Spreadsheet', 'joe'),
(109, 'What is the time complexity of binary search?', 77, 'O(1)', 'O(log n)', 'O(n)', 'O(n²)', 'O(log n)', 'joe'),
(110, 'Which sorting algorithm has worst-case O(n log n) complexity?', 77, 'Bubble Sort', 'Quick Sort', 'Merge Sort', 'Insertion Sort', 'Merge Sort', 'joe'),
(111, 'In object-oriented programming, what is encapsulation?', 77, 'Hiding implementation details', 'Creating multiple functions with same name', 'Inheriting properties from parent class', 'Converting data types', 'Hiding implementation details', 'joe'),
(112, 'What does DNS stand for?', 77, 'Data Network System', 'Domain Name System', 'Digital Naming Service', 'Distributed Network Service', 'Domain Name System', 'joe'),
(113, 'Which of these is NOT a design pattern?', 77, 'Singleton', 'Observer', 'Iterator', 'Compiler', 'Compiler', 'joe'),
(114, 'What is the main purpose of an API?', 77, 'Store data', 'Enable software communication', 'mprove processing speed', 'Create user interfaces', 'Enable software communication', 'joe'),
(115, 'Which language is primarily used for machine learning?', 77, 'Java', 'C++', 'Python', 'Ruby', 'Python', 'joe'),
(116, 'What does SQL stand for?', 77, 'Simple Query Language', 'Structured Question Language', 'Standard Query Language', 'Structured Query Language', 'Structured Query Language', 'joe'),
(117, 'Which branch of engineering deals with aircraft design?', 78, 'Civil Engineering', 'Aeronautical Engineering', 'Electrical Engineering', 'Chemical Engineering', 'Aeronautical Engineering', 'joe'),
(118, 'What is the SI unit of force?', 78, 'A) Joule', 'Watt', 'Newton', 'Pascal', 'Newton', 'joe'),
(119, 'Which material property describes resistance to permanent deformation?', 78, 'Ductility', 'Hardness', 'Malleability', 'Elasticity', 'Hardness', 'joe'),
(120, 'In thermodynamics, what does the First Law state?', 78, 'Energy cannot be created or destroyed', 'Entropy always increases', 'Heat flows from hot to cold', 'Pressure decreases with velocity', 'Energy cannot be created or destroyed', 'joe'),
(121, 'Which type of bridge uses triangular structures for support?', 78, 'Suspension bridge', 'Arch bridge', 'Truss bridge', 'Cantilever bridge', 'Truss bridge', 'joe'),
(122, 'What does CAD stand for in engineering?', 78, 'Computer-Aided Design', 'Computational Analysis Diagram', 'Computer-Assisted Drafting', 'Centralized Architectural Design', 'Computer-Aided Design', 'joe'),
(123, 'Which electrical component stores energy in a magnetic field?', 78, 'Capacitor', 'Resistor', 'Inductor', 'Transistor', 'Inductor', 'joe'),
(124, 'What is the purpose of a vernier caliper?', 78, 'Measure electrical current', 'Measure small distances precisely', 'Test material hardness', 'Calculate fluid flow rates', 'Measure small distances precisely', 'joe'),
(125, 'In fluid mechanics, what does Bernoulli s principle describe?', 79, 'Relationship between pressure and velocity', 'Viscosity of non-Newtonian fluids', 'Turbulent flow patterns', 'Heat transfer in fluids', 'Relationship between pressure and velocity', 'joe'),
(126, 'Which engineering discipline focuses on medical equipment design?', 79, 'Mechanical Engineering', 'Biomedical Engineering', 'Industrial Engineering', 'Materials Engineering', 'Biomedical Engineering', 'joe'),
(127, 'What is the yield strength of a material?', 79, 'Maximum stress before fracture', 'Stress at which deformation becomes permanent', 'Resistance to scratching', 'Ability to return to original shape', 'Stress at which deformation becomes permanent', 'joe'),
(128, 'Which law describes current-voltage relationships in circuits?', 79, 'Newton s Law', 'Ohm s Law', 'Faraday s Law', 'Hooke s Law', 'Ohm s Law', 'joe'),
(129, 'What is the purpose of a PLC in industrial systems?', 79, 'Process control and automation', 'Power load calculation', 'Product lifecycle management', 'Pressure level control', 'Process control and automation', 'joe'),
(130, 'Which engineering concept explains why skyscrapers can sway?', 79, 'Thermal expansion', 'Resonance frequency', 'Tensile strength', 'Young s modulus', 'Resonance frequency', 'joe'),
(131, 'What does FEA stand for in mechanical engineering?', 79, 'Finite Element Analysis', 'Fluid Energy Assessment', 'Force Equilibrium Application', 'Fatigue Evaluation Algorithm', 'Finite Element Analysis', 'joe'),
(132, 'Which material is commonly used for semiconductor chips?', 79, 'Aluminum', 'Copper', 'Silicon', 'Graphene', 'Silicon', 'joe'),
(133, 'What does the term \"DOF\" stand for in robotics?', 80, 'Degrees of Freedom', 'Direction of Force', 'Dynamic Operational Feature', 'Digital Output Format', 'Degrees of Freedom', 'joe'),
(134, 'Which type of robot joint mimics the twisting motion of a human wrist?', 80, 'Revolute', 'Prismatic', 'Spherical', 'Cylindrical', 'Spherical', 'joe'),
(135, 'What is the most common power source for industrial robots?', 80, 'Batteries', 'Hydraulics', 'Pneumatics', 'Electrical motors', 'Electrical motors', 'joe'),
(136, 'Which sensor helps robots avoid obstacles?', 80, 'Gyroscope', 'Accelerometer', 'Ultrasonic sensor', 'Thermocouple', 'Ultrasonic sensor', 'joe'),
(137, 'What is the name for a robot s coordinate system?', 80, 'Cartesian frame', 'Newtonian space', 'Euclidean plane', 'Robotic matrix', 'Cartesian frame', 'joe'),
(138, 'Which programming language is most commonly used in industrial robotics?', 80, 'Python', 'C++', 'RAPID', 'Java', 'RAPID', 'joe'),
(139, 'What does \"ROS\" stand for in robotics?', 80, 'Robotic Operating System', 'Robot Orientation Software', 'Remote Operation Service', 'Reactive Output System', 'Robotic Operating System', 'joe'),
(140, 'Which law of robotics states a robot must obey human orders?', 80, 'Zeroth Law', 'First Law', 'Second Law', 'Third Law', 'Second Law', 'joe'),
(141, ' What is the term for a robot s ability to determine its position?', 81, 'Localization', 'Mapping', 'Path planning', 'SLAM', 'Localization', 'joe'),
(142, 'Which algorithm is commonly used for robot path planning?', 81, 'Dijkstra s', 'Fourier Transform', 'Backpropagation', 'SHA-256', 'Dijkstra s', 'joe'),
(143, 'What type of actuator provides smooth, human-like motion?', 81, 'Servo motor', 'Stepper motor', 'Pneumatic actuator', 'Series elastic actuator', 'Stepper motor', 'joe'),
(144, 'Which component converts robot joint positions to end-effector coordinates?', 81, 'Forward kinematics', 'Forward kinematics', 'Jacobian matrix', 'PID controller', 'Forward kinematics', 'joe'),
(145, 'What does \"HRI\" stand for in robotics?', 81, 'Human-Robot Interaction', 'High-Rate Interface', 'Hybrid Rotation Index', 'Hydraulic Resistance Indicator', 'Human-Robot Interaction', 'joe'),
(146, 'Which sensor helps robots maintain balance?', 81, 'IMU (Inertial Measurement Unit)', 'LIDAR', 'Force-torque sensor', 'Camera', 'IMU (Inertial Measurement Unit)', 'joe'),
(147, 'What is the purpose of a PID controller in robotics?', 81, 'Image processing', 'Precise motion control', 'Power distribution', 'Data transmission', 'Precise motion control', 'joe'),
(148, 'Which type of robot is designed to operate in unstructured environments?', 81, 'Cartesian robot', 'SCARA robot', 'Mobile robot', 'Delta robot', 'Mobile robot', 'joe');

-- --------------------------------------------------------

--
-- Table structure for table `quizzes`
--

CREATE TABLE `quizzes` (
  `quiz_id` int(30) NOT NULL,
  `quiz_name` varchar(40) NOT NULL,
  `category_id` int(4) NOT NULL,
  `instructor_username` varchar(30) NOT NULL,
  `description` varchar(100) DEFAULT NULL,
  `date_created` datetime DEFAULT current_timestamp(),
  `nb_questions` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `quizzes`
--

INSERT INTO `quizzes` (`quiz_id`, `quiz_name`, `category_id`, `instructor_username`, `description`, `date_created`, `nb_questions`) VALUES
(1, 'General Science Challenge', 2, 'joe', 'Test your knowledge of basic science concepts', '2025-06-01 02:03:17', 10),
(71, 'History Quiz', 3, 'joe', 'Some general history knowledge.', '2025-06-01 01:27:08', 10),
(72, 'World History Challenge', 3, 'joe', 'Test Your Knowledge! General world history quiz.', '2025-06-01 01:37:10', 10),
(73, 'Empires & Dynasties', 3, 'joe', 'Empires & Dynasties: Can You Rule This History Quiz?', '2025-06-01 01:42:24', 10),
(74, 'Science Quiz: Test Your Knowledge!', 2, 'joe', 'General science quiz.', '2025-06-01 01:46:43', 10),
(75, 'Ultimate Science Quiz', 2, 'joe', 'It is a more advanced quiz. Prove Your Genius!', '2025-06-01 01:54:15', 9),
(76, 'Computer Science Fundamentals', 4, 'joe', 'Basics of Computer Sciece quiz.', '2025-06-01 02:12:07', 8),
(77, 'Advanced Computer Science', 4, 'joe', 'Quiz for advanced Computer Science knowledge.', '2025-06-01 02:16:23', 8),
(78, 'Basic Engineering Principles', 6, 'joe', 'Basic level engineering quiz', '2025-06-01 02:20:42', 8),
(79, 'Advanced Engineering Concepts', 6, 'joe', 'More advanced level quiz in engineering.', '2025-06-01 02:24:05', 8),
(80, 'Robotics Fundamentals', 7, 'joe', 'The basic and fundamaentals of Robotics', '2025-06-01 02:30:53', 8),
(81, 'Advanced Robotics Quiz', 7, 'joe', 'Advanced level in robotics, with more hard questions.', '2025-06-01 02:34:50', 8);

-- --------------------------------------------------------

--
-- Table structure for table `scores`
--

CREATE TABLE `scores` (
  `score_id` int(30) NOT NULL,
  `quiz_id` int(30) NOT NULL,
  `score` float NOT NULL,
  `date_submitted` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `scores`
--

INSERT INTO `scores` (`score_id`, `quiz_id`, `score`, `date_submitted`) VALUES
(351, 1, 20, '2025-06-01 02:43:54'),
(352, 1, 40, '2025-06-01 02:44:07'),
(353, 1, 50, '2025-06-01 02:44:17'),
(354, 78, 12.5, '2025-06-01 02:46:20');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`category_id`),
  ADD KEY `instructor_username` (`instructor_username`);

--
-- Indexes for table `instructors`
--
ALTER TABLE `instructors`
  ADD PRIMARY KEY (`username`);

--
-- Indexes for table `questions`
--
ALTER TABLE `questions`
  ADD PRIMARY KEY (`question_id`),
  ADD KEY `quiz_id` (`quiz_id`),
  ADD KEY `username` (`username`);

--
-- Indexes for table `quizzes`
--
ALTER TABLE `quizzes`
  ADD PRIMARY KEY (`quiz_id`),
  ADD KEY `category_id` (`category_id`),
  ADD KEY `instructor_username` (`instructor_username`);

--
-- Indexes for table `scores`
--
ALTER TABLE `scores`
  ADD PRIMARY KEY (`score_id`),
  ADD KEY `quiz_id` (`quiz_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `category_id` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `questions`
--
ALTER TABLE `questions`
  MODIFY `question_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=149;

--
-- AUTO_INCREMENT for table `quizzes`
--
ALTER TABLE `quizzes`
  MODIFY `quiz_id` int(30) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=82;

--
-- AUTO_INCREMENT for table `scores`
--
ALTER TABLE `scores`
  MODIFY `score_id` int(30) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=355;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `category`
--
ALTER TABLE `category`
  ADD CONSTRAINT `category_ibfk_1` FOREIGN KEY (`instructor_username`) REFERENCES `instructors` (`username`) ON UPDATE CASCADE;

--
-- Constraints for table `questions`
--
ALTER TABLE `questions`
  ADD CONSTRAINT `questions_ibfk_1` FOREIGN KEY (`quiz_id`) REFERENCES `quizzes` (`quiz_id`),
  ADD CONSTRAINT `questions_ibfk_2` FOREIGN KEY (`username`) REFERENCES `instructors` (`username`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `quizzes`
--
ALTER TABLE `quizzes`
  ADD CONSTRAINT `quizzes_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `category` (`category_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `quizzes_ibfk_2` FOREIGN KEY (`instructor_username`) REFERENCES `instructors` (`username`) ON UPDATE CASCADE;

--
-- Constraints for table `scores`
--
ALTER TABLE `scores`
  ADD CONSTRAINT `scores_ibfk_1` FOREIGN KEY (`quiz_id`) REFERENCES `quizzes` (`quiz_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
