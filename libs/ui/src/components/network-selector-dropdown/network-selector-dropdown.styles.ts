import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  dropdownButtonStyle: {
    width: 200,
    padding: 8,
    backgroundColor: '#16161C',
    borderRadius: 24,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 12
  },
  dropdownButtonTxtStyle: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    color: '#DDD',
    lineHeight: 24
  },
  dropdownButtonArrowStyle: {
    fontSize: 28
  },
  dropdownButtonIconStyle: {
    fontSize: 28,
    marginRight: 8
  },
  dropdownMenuStyle: {
    backgroundColor: '#16161C',
    borderRadius: 8
  },
  dropdownItemStyle: {
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8
  },
  dropdownItemTxtStyle: {
    flex: 1,
    fontSize: 14,
    fontWeight: '500',
    color: '#DDD'
  },
  dropdownItemIconStyle: {
    fontSize: 28,
    marginRight: 8
  }
});
