import os
import pandas as pd
from sklearn.model_selection import train_test_split
from xgboost import XGBClassifier
from sklearn.metrics import accuracy_score, confusion_matrix, classification_report
import joblib

# Define data folder path
data_folder = 'C:\\Users\\Harshit_Saini\\Downloads\\Financialfraud\\Data'

# Load the data
transaction_records = pd.read_csv(os.path.join(data_folder, 'TransactionData', 'transaction_records.csv'))
transaction_metadata = pd.read_csv(os.path.join(data_folder, 'TransactionData', 'transaction_metadata.csv'))
customer_data = pd.read_csv(os.path.join(data_folder, 'CustomerProfiles', 'customer_data.csv'))
account_activity = pd.read_csv(os.path.join(data_folder, 'CustomerProfiles', 'account_activity.csv'))
fraud_indicators = pd.read_csv(os.path.join(data_folder, 'FraudulentPatterns', 'fraud_indicators.csv'))
suspicious_activity = pd.read_csv(os.path.join(data_folder, 'FraudulentPatterns', 'suspicious_activity.csv'))
amount_data = pd.read_csv(os.path.join(data_folder, 'TransactionAmounts', 'amount_data.csv'))
anomaly_scores = pd.read_csv(os.path.join(data_folder, 'TransactionAmounts', 'anomaly_scores.csv'))
merchant_data = pd.read_csv(os.path.join(data_folder, 'MerchantInformation', 'merchant_data.csv'))
transaction_category_labels = pd.read_csv(os.path.join(data_folder, 'MerchantInformation', 'transaction_category_labels.csv'))

# Merge data to create a comprehensive dataset
data = pd.merge(transaction_records, transaction_metadata, on='TransactionID')
data = pd.merge(data, customer_data, on='CustomerID')
data = pd.merge(data, account_activity, on='CustomerID')
data = pd.merge(data, fraud_indicators, on='TransactionID', how='left')
data = pd.merge(data, suspicious_activity, on='CustomerID', how='left')
data = pd.merge(data, amount_data, on='TransactionID')
data = pd.merge(data, anomaly_scores, on='TransactionID', how='left')
data = pd.merge(data, merchant_data, on='MerchantID')
data = pd.merge(data, transaction_category_labels, on='TransactionID')

# Fill missing values in fraud indicators and suspicious activity columns
data['FraudIndicator'].fillna(0, inplace=True)
data['SuspiciousFlag'].fillna(0, inplace=True)

# Feature engineering
data['Timestamp'] = pd.to_datetime(data['Timestamp'], format='%Y-%m-%d %H:%M:%S')
data['HourOfDay'] = data['Timestamp'].dt.hour

# Select relevant features for the model
features = ['Age', 'AccountBalance','TransactionAmount', 'SuspiciousFlag']
X = data[features]
y = data['FraudIndicator']

# Split the data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
neg_class_count = len(y_train[y_train == 0])
pos_class_count = len(y_train[y_train == 1])

weight_ratio = neg_class_count / pos_class_count
# Train a simple random forest classifier
xgb_clf = XGBClassifier(iterations = 100,random_state=42)
xgb_clf.fit(X_train, y_train)

# Make predictions on the test set
y_pred = xgb_clf.predict(X_test)

# Evaluate the model
print('Accuracy:', accuracy_score(y_test, y_pred))
print('Confusion Matrix:\n', confusion_matrix(y_test, y_pred))
print('Classification Report:\n', classification_report(y_test, y_pred))
feature_importances = pd.DataFrame({'Feature': features, 'Importance': xgb_clf.feature_importances_})
feature_importances = feature_importances.sort_values(by='Importance', ascending=False)
print('Feature Importance:\n', feature_importances)
from sklearn.model_selection import GridSearchCV

# Define the hyperparameter grid
param_grid = {
    'n_estimators': [100, 200, 300],
    'max_depth': [3, 5, 7],
    'learning_rate': [0.01, 0.1, 0.2]
}

# Perform Grid Search
grid_search = GridSearchCV(XGBClassifier(random_state=42), param_grid, cv=3)
grid_search.fit(X_train, y_train)

# Print the best parameters
print('Best Parameters:', grid_search.best_params_)

# Use the best model for predictions
best_xgb_clf = grid_search.best_estimator_
y_pred_best = best_xgb_clf.predict(X_test)
print('Classification Report:\n', classification_report(y_test, y_pred_best))
# Evaluate the best model
print('Accuracy (Best Model):', accuracy_score(y_test, y_pred_best))



# Save the trained model
model_filename = 'fraud_detection_model.joblib'
joblib.dump(best_xgb_clf, model_filename)